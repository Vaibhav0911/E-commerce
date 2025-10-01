# Quick Start Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

The `.env` file is already created with default values. You can modify it if needed:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=ecommerce_super_secret_jwt_key_2024_change_this_in_production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**Important**: Change the `JWT_SECRET` in production!

### 3. Start MongoDB

Make sure MongoDB is running on your system:

**Windows:**
```bash
# If MongoDB is installed as a service
net start MongoDB

# Or run mongod directly
mongod
```

**macOS/Linux:**
```bash
# Using systemctl
sudo systemctl start mongod

# Or using brew (macOS)
brew services start mongodb-community
```

### 4. Run the Application

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start at: `http://localhost:5000`

## Testing the API

### Option 1: Using Postman

1. Import the `postman_collection.json` file into Postman
2. Set the `base_url` variable to `http://localhost:5000/api`
3. Start testing the endpoints

### Option 2: Using cURL

**1. Create an Admin User:**
```bash
curl -X POST http://localhost:5000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

Copy the `token` from the response.

**3. Create a Product (Admin only):**
```bash
curl -X POST http://localhost:5000/api/products ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"name\":\"Laptop\",\"description\":\"High-performance laptop\",\"price\":999.99,\"stock\":50,\"category\":\"electronics\"}"
```

**4. Get All Products:**
```bash
curl -X GET http://localhost:5000/api/products
```

**5. Add Product to Cart:**
```bash
curl -X POST http://localhost:5000/api/cart ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"productId\":\"PRODUCT_ID_HERE\",\"quantity\":2}"
```

**6. Create an Order:**
```bash
curl -X POST http://localhost:5000/api/orders ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN_HERE" ^
  -d "{\"shippingAddress\":{\"street\":\"123 Main St\",\"city\":\"New York\",\"state\":\"NY\",\"zipCode\":\"10001\",\"country\":\"USA\"},\"paymentMethod\":\"credit_card\"}"
```

## API Endpoints Overview

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all products (Public)
- `GET /api/products/:id` - Get single product (Public)
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get user cart (Protected)
- `POST /api/cart` - Add item to cart (Protected)
- `PUT /api/cart/:productId` - Update cart item (Protected)
- `DELETE /api/cart/:productId` - Remove item from cart (Protected)
- `DELETE /api/cart` - Clear cart (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders` - Get user orders (Protected)
- `GET /api/orders/:id` - Get single order (Protected)
- `PUT /api/orders/:id/cancel` - Cancel order (Protected)
- `GET /api/orders/admin/all` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

## Common Issues & Solutions

### Issue: MongoDB Connection Error

**Solution:**
- Make sure MongoDB is running
- Check if the `MONGODB_URI` in `.env` is correct
- Try connecting to MongoDB using MongoDB Compass to verify

### Issue: Port Already in Use

**Solution:**
- Change the `PORT` in `.env` file
- Or kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:5000 | xargs kill -9
  ```

### Issue: JWT Token Invalid

**Solution:**
- Make sure you're including the token in the Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN_HERE`
- Check if the token hasn't expired (default: 7 days)

## Project Structure

```
E-commerce/
├── config/              # Configuration files
├── controllers/         # Request handlers
├── middleware/          # Custom middleware
├── models/             # Database models
├── routes/             # API routes
├── utils/              # Utility functions
├── .env                # Environment variables
├── server.js           # Entry point
└── package.json        # Dependencies
```

## Next Steps

1. ✅ Set up the backend (You're here!)
2. 🔄 Test all API endpoints
3. 🎨 Build a frontend (React, Vue, or Angular)
4. 🚀 Deploy to production (Heroku, AWS, DigitalOcean, etc.)

## Need Help?

- Check the full documentation in `README.md`
- Review the Postman collection for example requests
- Check the code comments for detailed explanations

---

**Happy Coding! 🚀**