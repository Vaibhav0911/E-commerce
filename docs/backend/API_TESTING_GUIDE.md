# API Testing Guide

This guide provides step-by-step instructions for testing all API endpoints.

## Setup

1. Make sure the server is running: `npm run dev`
2. Server should be accessible at: `http://localhost:5000`

## Testing Workflow

### Step 1: Create Users

#### Create Admin User
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Save the token for admin operations!**

#### Create Regular User
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Step 2: Login

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

### Step 3: Get Current User Info

```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### Step 4: Create Products (Admin Only)

#### Product 1: Laptop
```bash
POST http://localhost:5000/api/products
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "name": "MacBook Pro 16",
  "description": "Apple M2 Pro chip, 16GB RAM, 512GB SSD",
  "price": 2499.99,
  "stock": 25,
  "image": "macbook-pro.jpg",
  "category": "electronics"
}
```

#### Product 2: Smartphone
```bash
POST http://localhost:5000/api/products
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "A17 Pro chip, 256GB, Titanium design",
  "price": 1199.99,
  "stock": 50,
  "image": "iphone-15-pro.jpg",
  "category": "electronics"
}
```

#### Product 3: Headphones
```bash
POST http://localhost:5000/api/products
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "name": "Sony WH-1000XM5",
  "description": "Wireless noise-canceling headphones",
  "price": 399.99,
  "stock": 100,
  "image": "sony-headphones.jpg",
  "category": "audio"
}
```

**Save the product IDs from responses!**

### Step 5: Get All Products (Public)

```bash
GET http://localhost:5000/api/products
```

#### With Filters
```bash
# Filter by category
GET http://localhost:5000/api/products?category=electronics

# Filter by price range
GET http://localhost:5000/api/products?minPrice=100&maxPrice=1500

# Search products
GET http://localhost:5000/api/products?search=iphone

# Combined filters
GET http://localhost:5000/api/products?category=electronics&minPrice=1000&maxPrice=3000&search=pro
```

### Step 6: Get Single Product

```bash
GET http://localhost:5000/api/products/PRODUCT_ID
```

### Step 7: Update Product (Admin Only)

```bash
PUT http://localhost:5000/api/products/PRODUCT_ID
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "name": "MacBook Pro 16 (Updated)",
  "description": "Apple M2 Pro chip, 16GB RAM, 512GB SSD - Now with discount!",
  "price": 2299.99,
  "stock": 20
}
```

### Step 8: Add Products to Cart (User)

**Login as regular user first:**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Save the user token!**

#### Add Laptop to Cart
```bash
POST http://localhost:5000/api/cart
Authorization: Bearer YOUR_USER_TOKEN
Content-Type: application/json

{
  "productId": "LAPTOP_PRODUCT_ID",
  "quantity": 1
}
```

#### Add Headphones to Cart
```bash
POST http://localhost:5000/api/cart
Authorization: Bearer YOUR_USER_TOKEN
Content-Type: application/json

{
  "productId": "HEADPHONES_PRODUCT_ID",
  "quantity": 2
}
```

### Step 9: Get Cart

```bash
GET http://localhost:5000/api/cart
Authorization: Bearer YOUR_USER_TOKEN
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "user": "...",
    "items": [
      {
        "product": {
          "_id": "...",
          "name": "MacBook Pro 16",
          "price": 2499.99,
          "image": "macbook-pro.jpg",
          "stock": 25
        },
        "quantity": 1
      },
      {
        "product": {
          "_id": "...",
          "name": "Sony WH-1000XM5",
          "price": 399.99,
          "image": "sony-headphones.jpg",
          "stock": 100
        },
        "quantity": 2
      }
    ]
  }
}
```

### Step 10: Update Cart Item

```bash
PUT http://localhost:5000/api/cart/HEADPHONES_PRODUCT_ID
Authorization: Bearer YOUR_USER_TOKEN
Content-Type: application/json

{
  "quantity": 3
}
```

### Step 11: Remove Item from Cart

```bash
DELETE http://localhost:5000/api/cart/HEADPHONES_PRODUCT_ID
Authorization: Bearer YOUR_USER_TOKEN
```

### Step 12: Create Order

```bash
POST http://localhost:5000/api/orders
Authorization: Bearer YOUR_USER_TOKEN
Content-Type: application/json

{
  "shippingAddress": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card"
}
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "_id": "...",
    "user": "...",
    "items": [...],
    "totalAmount": 2499.99,
    "status": "pending",
    "shippingAddress": {...},
    "paymentMethod": "credit_card",
    "paymentStatus": "pending"
  }
}
```

**Save the order ID!**

### Step 13: Get User Orders

```bash
GET http://localhost:5000/api/orders
Authorization: Bearer YOUR_USER_TOKEN
```

### Step 14: Get Single Order

```bash
GET http://localhost:5000/api/orders/ORDER_ID
Authorization: Bearer YOUR_USER_TOKEN
```

### Step 15: Cancel Order

```bash
PUT http://localhost:5000/api/orders/ORDER_ID/cancel
Authorization: Bearer YOUR_USER_TOKEN
```

### Step 16: Admin - Get All Orders

```bash
GET http://localhost:5000/api/orders/admin/all
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### Step 17: Admin - Update Order Status

```bash
PUT http://localhost:5000/api/orders/ORDER_ID/status
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "status": "processing"
}
```

**Valid status values:**
- `pending`
- `processing`
- `shipped`
- `delivered`
- `cancelled`

### Step 18: Delete Product (Admin Only)

```bash
DELETE http://localhost:5000/api/products/PRODUCT_ID
Authorization: Bearer YOUR_ADMIN_TOKEN
```

### Step 19: Clear Cart

```bash
DELETE http://localhost:5000/api/cart
Authorization: Bearer YOUR_USER_TOKEN
```

## Error Testing

### Test Invalid Credentials
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "wrong@example.com",
  "password": "wrongpassword"
}
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### Test Unauthorized Access
```bash
POST http://localhost:5000/api/products
Content-Type: application/json

{
  "name": "Test Product",
  "description": "Test",
  "price": 99.99,
  "stock": 10
}
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### Test User Trying Admin Route
```bash
POST http://localhost:5000/api/products
Authorization: Bearer USER_TOKEN_NOT_ADMIN
Content-Type: application/json

{
  "name": "Test Product",
  "description": "Test",
  "price": 99.99,
  "stock": 10
}
```

**Expected Response (403):**
```json
{
  "success": false,
  "message": "User role 'user' is not authorized to access this route"
}
```

### Test Validation Errors
```bash
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "name": "A",
  "email": "invalid-email",
  "password": "123"
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Name must be between 2 and 50 characters",
      "param": "name",
      "location": "body"
    },
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Test Insufficient Stock
```bash
POST http://localhost:5000/api/cart
Authorization: Bearer YOUR_USER_TOKEN
Content-Type: application/json

{
  "productId": "PRODUCT_ID",
  "quantity": 999999
}
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Insufficient stock"
}
```

### Test Product Not Found
```bash
GET http://localhost:5000/api/products/invalid_id_here
```

**Expected Response (404):**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

## Testing Checklist

- [ ] User signup (regular user)
- [ ] User signup (admin user)
- [ ] User login
- [ ] Get current user
- [ ] Create products (admin)
- [ ] Get all products
- [ ] Get single product
- [ ] Update product (admin)
- [ ] Delete product (admin)
- [ ] Add items to cart
- [ ] Get cart
- [ ] Update cart item
- [ ] Remove item from cart
- [ ] Create order
- [ ] Get user orders
- [ ] Get single order
- [ ] Cancel order
- [ ] Get all orders (admin)
- [ ] Update order status (admin)
- [ ] Clear cart
- [ ] Test error scenarios
- [ ] Test validation
- [ ] Test authorization

## Tips

1. **Save Tokens**: Keep admin and user tokens handy for testing
2. **Save IDs**: Note down product IDs and order IDs for subsequent requests
3. **Check Stock**: After creating orders, verify that product stock is reduced
4. **Test Edge Cases**: Try invalid inputs, missing fields, wrong IDs
5. **Monitor Console**: Check server logs for detailed error messages

## Using Postman

1. Import `postman_collection.json`
2. Set environment variables:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (will be set after login)
3. Use the collection to test all endpoints systematically

---

**Happy Testing! 🧪**