const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Product = require('../../models/Product');
const Cart = require('../../models/Cart');
const Order = require('../../models/Order');

let mongoServer;
let userToken;
let userId;
let productId;

beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create user
  const userResponse = await request(app).post('/api/auth/signup').send({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  });
  userToken = userResponse.body.data.token;
  userId = userResponse.body.data._id;

  // Create product
  const product = await Product.create({
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    category: 'Electronics',
    stock: 10,
    image: 'test.jpg',
  });
  productId = product._id;
});

afterEach(async () => {
  await Cart.deleteMany();
  await Order.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Cart to Order Flow - Integration Tests', () => {
  it('should complete full cart to order workflow', async () => {
    // Step 1: Add product to cart
    const addToCartResponse = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: productId.toString(),
        quantity: 2,
      })
      .expect(200);

    expect(addToCartResponse.body.success).toBe(true);
    expect(addToCartResponse.body.data.items).toHaveLength(1);
    expect(addToCartResponse.body.data.items[0].quantity).toBe(2);

    // Step 2: Get cart
    const getCartResponse = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(getCartResponse.body.success).toBe(true);
    expect(getCartResponse.body.data.items).toHaveLength(1);
    expect(getCartResponse.body.data.totalPrice).toBeCloseTo(199.98, 2); // 99.99 * 2

    // Step 3: Update cart item quantity
    const updateCartResponse = await request(app)
      .put(`/api/cart/${productId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        quantity: 3,
      })
      .expect(200);

    expect(updateCartResponse.body.success).toBe(true);
    expect(updateCartResponse.body.data.items[0].quantity).toBe(3);
    expect(updateCartResponse.body.data.totalPrice).toBeCloseTo(299.97, 2); // 99.99 * 3

    // Step 4: Create order from cart
    const createOrderResponse = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        shippingAddress: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'Test Country',
        },
        paymentMethod: 'credit_card',
      })
      .expect(201);

    expect(createOrderResponse.body.success).toBe(true);
    expect(createOrderResponse.body.data.items).toHaveLength(1);
    expect(createOrderResponse.body.data.totalPrice).toBeCloseTo(299.97, 2);
    expect(createOrderResponse.body.data.status).toBe('pending');

    const orderId = createOrderResponse.body.data._id;

    // Step 5: Verify cart is cleared after order
    const cartAfterOrderResponse = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(cartAfterOrderResponse.body.data.items).toHaveLength(0);

    // Step 6: Get order details
    const getOrderResponse = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(getOrderResponse.body.success).toBe(true);
    expect(getOrderResponse.body.data._id).toBe(orderId);

    // Step 7: Get all user orders
    const getAllOrdersResponse = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(getAllOrdersResponse.body.success).toBe(true);
    expect(getAllOrdersResponse.body.data).toHaveLength(1);
  });

  it('should handle cart operations correctly', async () => {
    // Add first product
    await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: productId.toString(),
        quantity: 1,
      })
      .expect(200);

    // Add same product again (should update quantity)
    const response = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: productId.toString(),
        quantity: 2,
      })
      .expect(200);

    expect(response.body.data.items).toHaveLength(1);
    expect(response.body.data.items[0].quantity).toBe(3); // 1 + 2

    // Remove item from cart
    const removeResponse = await request(app)
      .delete(`/api/cart/${productId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .expect(200);

    expect(removeResponse.body.success).toBe(true);
    expect(removeResponse.body.data.items).toHaveLength(0);
  });

  it('should not create order with empty cart', async () => {
    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        shippingAddress: {
          street: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'Test Country',
        },
        paymentMethod: 'credit_card',
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  it('should not add out of stock product to cart', async () => {
    // Create out of stock product
    const outOfStockProduct = await Product.create({
      name: 'Out of Stock Product',
      description: 'No stock',
      price: 99.99,
      category: 'Electronics',
      stock: 0,
      image: 'test.jpg',
    });

    const response = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: outOfStockProduct._id.toString(),
        quantity: 1,
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });

  it('should not add quantity exceeding stock', async () => {
    const response = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        productId: productId.toString(),
        quantity: 100, // More than available stock (10)
      })
      .expect(400);

    expect(response.body.success).toBe(false);
  });
});