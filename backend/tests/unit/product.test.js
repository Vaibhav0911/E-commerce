const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Product = require('../../models/Product');
const User = require('../../models/User');

let mongoServer;
let adminToken;
let userToken;

// Setup: Start in-memory MongoDB before all tests
beforeAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }

  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create admin user
  const adminResponse = await request(app).post('/api/auth/signup').send({
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  });
  adminToken = adminResponse.body.data.token;

  // Create regular user
  const userResponse = await request(app).post('/api/auth/signup').send({
    name: 'Regular User',
    email: 'user@example.com',
    password: 'user123',
  });
  userToken = userResponse.body.data.token;
});

afterEach(async () => {
  // Clear only products collection
  await Product.deleteMany();
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Product API - Unit Tests', () => {
  describe('GET /api/products', () => {
    beforeEach(async () => {
      // Create sample products
      await Product.create([
        {
          name: 'Product 1',
          description: 'Description 1',
          price: 99.99,
          category: 'Electronics',
          stock: 10,
          image: 'image1.jpg',
        },
        {
          name: 'Product 2',
          description: 'Description 2',
          price: 149.99,
          category: 'Electronics',
          stock: 5,
          image: 'image2.jpg',
        },
        {
          name: 'Product 3',
          description: 'Description 3',
          price: 199.99,
          category: 'Clothing',
          stock: 0,
          image: 'image3.jpg',
        },
      ]);
    });

    it('should get all products', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(3);
      expect(response.body.data[0]).toHaveProperty('name');
      expect(response.body.data[0]).toHaveProperty('price');
    });

    it('should filter products by category', async () => {
      const response = await request(app)
        .get('/api/products?category=Electronics')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data[0].category).toBe('Electronics');
    });

    it('should search products by name', async () => {
      const response = await request(app)
        .get('/api/products?search=Product 1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].name).toContain('Product 1');
    });
  });

  describe('GET /api/products/:id', () => {
    let productId;

    beforeEach(async () => {
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

    it('should get product by id', async () => {
      const response = await request(app)
        .get(`/api/products/${productId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe('Test Product');
      expect(response.body.data.price).toBe(99.99);
    });

    it('should return 404 for non-existent product', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      const response = await request(app)
        .get(`/api/products/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it('should return 404 for invalid product id', async () => {
      const response = await request(app)
        .get('/api/products/invalid-id')
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/products', () => {
    it('should create product as admin', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 299.99,
        category: 'Electronics',
        stock: 20,
        image: 'new.jpg',
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(productData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(productData.name);
      expect(response.body.data.price).toBe(productData.price);
    });

    it('should not create product without authentication', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 299.99,
        category: 'Electronics',
        stock: 20,
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not create product as regular user', async () => {
      const productData = {
        name: 'New Product',
        description: 'New Description',
        price: 299.99,
        category: 'Electronics',
        stock: 20,
      };

      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${userToken}`)
        .send(productData)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should not create product without required fields', async () => {
      const response = await request(app)
        .post('/api/products')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Incomplete Product',
          // Missing required fields
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe('PUT /api/products/:id', () => {
    let productId;

    beforeEach(async () => {
      const product = await Product.create({
        name: 'Original Product',
        description: 'Original Description',
        price: 99.99,
        category: 'Electronics',
        stock: 10,
        image: 'original.jpg',
      });
      productId = product._id;
    });

    it('should update product as admin', async () => {
      const updateData = {
        name: 'Updated Product',
        description: 'Updated description',
        price: 149.99,
        stock: 15,
        category: 'Electronics',
      };

      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.price).toBe(updateData.price);
    });

    it('should not update product without authentication', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}`)
        .send({ name: 'Updated' })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not update product as regular user', async () => {
      const response = await request(app)
        .put(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Updated' })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/products/:id', () => {
    let productId;

    beforeEach(async () => {
      const product = await Product.create({
        name: 'Product to Delete',
        description: 'Will be deleted',
        price: 99.99,
        category: 'Electronics',
        stock: 10,
        image: 'delete.jpg',
      });
      productId = product._id;
    });

    it('should delete product as admin', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify product is deleted
      const product = await Product.findById(productId);
      expect(product).toBeNull();
    });

    it('should not delete product without authentication', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it('should not delete product as regular user', async () => {
      const response = await request(app)
        .delete(`/api/products/${productId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});