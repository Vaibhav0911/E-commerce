# E-Commerce Backend API

A comprehensive RESTful API for an E-Commerce application built with Node.js, Express, and MongoDB.

## Features

- 🔐 JWT Authentication & Authorization
- 👥 Role-based Access Control (User & Admin)
- 🛍️ Product Management (CRUD)
- 🛒 Shopping Cart Functionality
- 📦 Order Management
- 🔒 Password Hashing with bcrypt
- ✅ Input Validation
- 🚨 Error Handling Middleware
- 📝 MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment Variables**: dotenv
- **CORS**: cors

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and update the values:
   ```bash
   cp .env.example .env
   ```

   Update the following variables in `.env`:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # For Windows (if MongoDB is installed as a service)
   net start MongoDB
   
   # For macOS/Linux
   sudo systemctl start mongod
   ```

5. **Run the application**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Sign Up
- **URL**: `/auth/signup`
- **Method**: `POST`
- **Access**: Public
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- **Success Response**: `201 Created`
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "token": "jwt_token_here"
    }
  }
  ```

#### 2. Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Access**: Public
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Success Response**: `200 OK`
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "token": "jwt_token_here"
    }
  }
  ```

#### 3. Get Current User
- **URL**: `/auth/me`
- **Method**: `GET`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`

### Product Endpoints

#### 1. Get All Products
- **URL**: `/products`
- **Method**: `GET`
- **Access**: Public
- **Query Parameters** (optional):
  - `category`: Filter by category
  - `minPrice`: Minimum price
  - `maxPrice`: Maximum price
  - `search`: Search in name and description
- **Example**: `/products?category=electronics&minPrice=100&maxPrice=1000`

#### 2. Get Single Product
- **URL**: `/products/:id`
- **Method**: `GET`
- **Access**: Public

#### 3. Create Product
- **URL**: `/products`
- **Method**: `POST`
- **Access**: Private (Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "stock": 50,
    "image": "product-image.jpg",
    "category": "electronics"
  }
  ```

#### 4. Update Product
- **URL**: `/products/:id`
- **Method**: `PUT`
- **Access**: Private (Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Same as Create Product

#### 5. Delete Product
- **URL**: `/products/:id`
- **Method**: `DELETE`
- **Access**: Private (Admin only)
- **Headers**: `Authorization: Bearer <token>`

### Cart Endpoints

#### 1. Get User Cart
- **URL**: `/cart`
- **Method**: `GET`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`

#### 2. Add Item to Cart
- **URL**: `/cart`
- **Method**: `POST`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "productId": "product_id_here",
    "quantity": 2
  }
  ```

#### 3. Update Cart Item
- **URL**: `/cart/:productId`
- **Method**: `PUT`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "quantity": 3
  }
  ```

#### 4. Remove Item from Cart
- **URL**: `/cart/:productId`
- **Method**: `DELETE`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`

#### 5. Clear Cart
- **URL**: `/cart`
- **Method**: `DELETE`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`

### Order Endpoints

#### 1. Create Order
- **URL**: `/orders`
- **Method**: `POST`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "shippingAddress": {
      "street": "123 Main St",
      "city": "New York",
      "state": "NY",
      "zipCode": "10001",
      "country": "USA"
    },
    "paymentMethod": "credit_card"
  }
  ```

#### 2. Get User Orders
- **URL**: `/orders`
- **Method**: `GET`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`

#### 3. Get Single Order
- **URL**: `/orders/:id`
- **Method**: `GET`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`

#### 4. Cancel Order
- **URL**: `/orders/:id/cancel`
- **Method**: `PUT`
- **Access**: Private
- **Headers**: `Authorization: Bearer <token>`

#### 5. Get All Orders (Admin)
- **URL**: `/orders/admin/all`
- **Method**: `GET`
- **Access**: Private (Admin only)
- **Headers**: `Authorization: Bearer <token>`

#### 6. Update Order Status (Admin)
- **URL**: `/orders/:id/status`
- **Method**: `PUT`
- **Access**: Private (Admin only)
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "status": "shipped"
  }
  ```
- **Valid Status Values**: `pending`, `processing`, `shipped`, `delivered`, `cancelled`

## Project Structure

```
E-commerce/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── productController.js # Product CRUD logic
│   ├── cartController.js    # Cart management logic
│   └── orderController.js   # Order management logic
├── middleware/
│   ├── auth.js              # JWT authentication & authorization
│   ├── errorHandler.js      # Global error handler
│   └── validation.js        # Input validation rules
├── models/
│   ├── User.js              # User schema
│   ├── Product.js           # Product schema
│   ├── Cart.js              # Cart schema
│   └── Order.js             # Order schema
├── routes/
│   ├── authRoutes.js        # Auth routes
│   ├── productRoutes.js     # Product routes
│   ├── cartRoutes.js        # Cart routes
│   └── orderRoutes.js       # Order routes
├── utils/
│   └── generateToken.js     # JWT token generator
├── .env                     # Environment variables
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── package.json             # Dependencies
├── server.js                # Entry point
└── README.md                # Documentation
```

## Models

### User Model
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (required, hashed)
- `role`: String (enum: 'user', 'admin', default: 'user')

### Product Model
- `name`: String (required)
- `description`: String (required)
- `price`: Number (required)
- `stock`: Number (required)
- `image`: String
- `category`: String
- `createdBy`: ObjectId (ref: User)

### Cart Model
- `user`: ObjectId (ref: User, unique)
- `items`: Array of:
  - `product`: ObjectId (ref: Product)
  - `quantity`: Number

### Order Model
- `user`: ObjectId (ref: User)
- `items`: Array of:
  - `product`: ObjectId (ref: Product)
  - `name`: String
  - `quantity`: Number
  - `price`: Number
- `totalAmount`: Number
- `status`: String (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
- `shippingAddress`: Object
- `paymentMethod`: String
- `paymentStatus`: String

## Error Handling

The API uses a centralized error handling middleware that catches all errors and returns consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Role-based access control
- Input validation and sanitization
- Protected routes with middleware
- CORS configuration

## Testing the API

You can test the API using tools like:
- **Postman**: Import the endpoints and test
- **Thunder Client**: VS Code extension
- **cURL**: Command-line tool
- **Insomnia**: REST client

### Example cURL Request

```bash
# Sign up
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get products (with token)
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Creating an Admin User

To create an admin user, you can either:

1. **During signup**: Include `"role": "admin"` in the signup request body
2. **Manually in MongoDB**: Update a user's role directly in the database

```javascript
// In MongoDB shell or Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## Future Enhancements

- [ ] Product image upload functionality
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Pagination for products and orders
- [ ] Order tracking
- [ ] Inventory management
- [ ] Discount codes and coupons

## License

ISC

## Author

Your Name

---

**Happy Coding! 🚀**