# 🏗️ Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                    http://localhost:3000                         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ HTTP/HTTPS
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      REACT FRONTEND                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Components: Navbar, ProductCard, Cart, etc.            │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Context: AuthContext, CartContext                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Pages: Home, Login, Cart, Checkout, Admin, etc.        │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Services: API (Axios)                                   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ REST API (JSON)
                             │ JWT Token in Headers
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                    EXPRESS BACKEND API                           │
│                   http://localhost:5000/api                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Routes: /auth, /products, /cart, /orders               │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Middleware: auth, validation, errorHandler              │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Controllers: authController, productController, etc.    │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Models: User, Product, Cart, Order (Mongoose)           │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             │ MongoDB Protocol
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      MONGODB DATABASE                            │
│                mongodb://localhost:27017/ecommerce               │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Collections: users, products, carts, orders             │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Request Flow

### 1. User Authentication Flow

```
User Browser
    │
    │ 1. Enter email & password
    │
    ▼
Login Page (React)
    │
    │ 2. POST /api/auth/login
    │    { email, password }
    │
    ▼
Auth Routes (Express)
    │
    │ 3. Validate input
    │
    ▼
Auth Controller
    │
    │ 4. Find user in DB
    │ 5. Compare password (bcrypt)
    │ 6. Generate JWT token
    │
    ▼
MongoDB
    │
    │ 7. Return user data
    │
    ▼
Response to Frontend
    │
    │ 8. { token, user }
    │
    ▼
AuthContext
    │
    │ 9. Store token in localStorage
    │ 10. Update user state
    │
    ▼
Redirect to Home
```

### 2. Product Browsing Flow

```
User Browser
    │
    │ 1. Navigate to home page
    │
    ▼
Home Page (React)
    │
    │ 2. useEffect() on mount
    │ 3. GET /api/products
    │
    ▼
Product Routes (Express)
    │
    │ 4. No auth required (public)
    │
    ▼
Product Controller
    │
    │ 5. Query MongoDB
    │ 6. Apply filters (category, search)
    │
    ▼
MongoDB
    │
    │ 7. Return products array
    │
    ▼
Response to Frontend
    │
    │ 8. { success: true, data: [...products] }
    │
    ▼
Home Page State
    │
    │ 9. setProducts(data)
    │ 10. Render ProductCard components
    │
    ▼
Display Products Grid
```

### 3. Add to Cart Flow

```
User Browser
    │
    │ 1. Click "Add to Cart"
    │
    ▼
ProductCard Component
    │
    │ 2. Check if authenticated
    │ 3. Call addToCart(productId, quantity)
    │
    ▼
CartContext
    │
    │ 4. POST /api/cart
    │    { productId, quantity }
    │    Headers: { Authorization: Bearer <token> }
    │
    ▼
Cart Routes (Express)
    │
    │ 5. Auth middleware verifies JWT
    │ 6. Extract user from token
    │
    ▼
Cart Controller
    │
    │ 7. Find user's cart
    │ 8. Check product stock
    │ 9. Add/update item in cart
    │ 10. Save cart
    │
    ▼
MongoDB
    │
    │ 11. Update cart document
    │ 12. Populate product details
    │
    ▼
Response to Frontend
    │
    │ 13. { success: true, data: updatedCart }
    │
    ▼
CartContext State
    │
    │ 14. setCart(updatedCart)
    │ 15. Update cart badge count
    │
    ▼
Show Success Message
```

### 4. Checkout & Order Flow

```
User Browser
    │
    │ 1. Fill shipping form
    │ 2. Click "Place Order"
    │
    ▼
Checkout Page (React)
    │
    │ 3. POST /api/orders
    │    { shippingAddress, paymentMethod }
    │    Headers: { Authorization: Bearer <token> }
    │
    ▼
Order Routes (Express)
    │
    │ 4. Auth middleware verifies JWT
    │ 5. Validate input
    │
    ▼
Order Controller
    │
    │ 6. Get user's cart
    │ 7. Validate cart not empty
    │ 8. Calculate total
    │ 9. Create order document
    │ 10. Reduce product stock
    │ 11. Clear user's cart
    │
    ▼
MongoDB (Transaction)
    │
    │ 12. Insert order
    │ 13. Update product stocks
    │ 14. Clear cart
    │
    ▼
Response to Frontend
    │
    │ 15. { success: true, data: newOrder }
    │
    ▼
Redirect to Orders Page
    │
    │ 16. Show success message
    │ 17. Display order details
    │
    ▼
Order Confirmation
```

### 5. Admin Product Management Flow

```
Admin Browser
    │
    │ 1. Click "Add Product"
    │ 2. Fill product form
    │ 3. Click "Add Product"
    │
    ▼
AdminProducts Page (React)
    │
    │ 4. POST /api/products
    │    { name, description, price, stock, category, image }
    │    Headers: { Authorization: Bearer <token> }
    │
    ▼
Product Routes (Express)
    │
    │ 5. Auth middleware verifies JWT
    │ 6. Authorize middleware checks role === 'admin'
    │ 7. Validate input
    │
    ▼
Product Controller
    │
    │ 8. Create product document
    │ 9. Set createdBy to admin user
    │ 10. Save to database
    │
    ▼
MongoDB
    │
    │ 11. Insert product document
    │
    ▼
Response to Frontend
    │
    │ 12. { success: true, data: newProduct }
    │
    ▼
AdminProducts State
    │
    │ 13. Refresh products list
    │ 14. Close modal
    │ 15. Show success message
    │
    ▼
Updated Products Table
```

## Data Flow Diagram

```
┌─────────────┐
│   Browser   │
└──────┬──────┘
       │
       │ User Actions
       │
┌──────▼──────┐
│   React     │◄──────┐
│  Components │       │
└──────┬──────┘       │
       │              │
       │ State        │ Props
       │ Updates      │
┌──────▼──────┐       │
│   Context   │───────┘
│    API      │
└──────┬──────┘
       │
       │ HTTP Requests
       │ (Axios)
┌──────▼──────┐
│   Express   │
│   Routes    │
└──────┬──────┘
       │
       │ Middleware
       │ Chain
┌──────▼──────┐
│ Controllers │
└──────┬──────┘
       │
       │ Mongoose
       │ Queries
┌──────▼──────┐
│   MongoDB   │
└─────────────┘
```

## Component Hierarchy

```
App
├── AuthProvider
│   └── CartProvider
│       ├── Navbar
│       │   ├── Logo
│       │   ├── Navigation Links
│       │   ├── Cart Badge
│       │   └── User Menu
│       │
│       ├── Routes
│       │   ├── Public Routes
│       │   │   ├── Home
│       │   │   │   ├── Search Bar
│       │   │   │   ├── Category Filter
│       │   │   │   └── ProductCard (multiple)
│       │   │   ├── ProductDetails
│       │   │   │   ├── Product Image
│       │   │   │   ├── Product Info
│       │   │   │   └── Add to Cart Button
│       │   │   ├── Login
│       │   │   └── Signup
│       │   │
│       │   ├── Protected Routes
│       │   │   ├── Cart
│       │   │   │   ├── Cart Items List
│       │   │   │   └── Order Summary
│       │   │   ├── Checkout
│       │   │   │   ├── Shipping Form
│       │   │   │   └── Order Summary
│       │   │   └── Orders
│       │   │       └── Order Card (multiple)
│       │   │
│       │   └── Admin Routes
│       │       ├── AdminDashboard
│       │       │   ├── Stats Cards
│       │       │   └── Quick Actions
│       │       ├── AdminProducts
│       │       │   ├── Products Table
│       │       │   └── Product Modal
│       │       └── AdminOrders
│       │           ├── Orders Table
│       │           └── Order Details Modal
│       │
│       └── Footer
```

## State Management

```
┌─────────────────────────────────────────────────────────┐
│                    AuthContext                          │
│  ┌───────────────────────────────────────────────────┐ │
│  │  State:                                           │ │
│  │    - user: { name, email, role }                 │ │
│  │    - loading: boolean                            │ │
│  │    - error: string                               │ │
│  │                                                   │ │
│  │  Methods:                                        │ │
│  │    - login(email, password)                      │ │
│  │    - signup(userData)                            │ │
│  │    - logout()                                    │ │
│  │    - isAdmin()                                   │ │
│  │    - isAuthenticated                             │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                    CartContext                          │
│  ┌───────────────────────────────────────────────────┐ │
│  │  State:                                           │ │
│  │    - cart: { items: [...] }                      │ │
│  │    - loading: boolean                            │ │
│  │    - error: string                               │ │
│  │                                                   │ │
│  │  Methods:                                        │ │
│  │    - fetchCart()                                 │ │
│  │    - addToCart(productId, quantity)              │ │
│  │    - updateCartItem(productId, quantity)         │ │
│  │    - removeFromCart(productId)                   │ │
│  │    - clearCart()                                 │ │
│  │    - getCartItemsCount()                         │ │
│  │    - getCartTotal()                              │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Database Schema

```
┌─────────────────────────────────────────────────────────┐
│                    users Collection                      │
│  ┌───────────────────────────────────────────────────┐ │
│  │  _id: ObjectId                                    │ │
│  │  name: String (required)                          │ │
│  │  email: String (required, unique)                 │ │
│  │  password: String (required, hashed)              │ │
│  │  role: String (enum: ['user', 'admin'])           │ │
│  │  createdAt: Date                                  │ │
│  │  updatedAt: Date                                  │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  products Collection                     │
│  ┌───────────────────────────────────────────────────┐ │
│  │  _id: ObjectId                                    │ │
│  │  name: String (required)                          │ │
│  │  description: String (required)                   │ │
│  │  price: Number (required)                         │ │
│  │  stock: Number (required, default: 0)             │ │
│  │  image: String                                    │ │
│  │  category: String                                 │ │
│  │  createdBy: ObjectId (ref: 'User')                │ │
│  │  createdAt: Date                                  │ │
│  │  updatedAt: Date                                  │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   carts Collection                       │
│  ┌───────────────────────────────────────────────────┐ │
│  │  _id: ObjectId                                    │ │
│  │  user: ObjectId (ref: 'User', unique)             │ │
│  │  items: [                                         │ │
│  │    {                                              │ │
│  │      product: ObjectId (ref: 'Product')           │ │
│  │      quantity: Number (required, min: 1)          │ │
│  │    }                                              │ │
│  │  ]                                                │ │
│  │  createdAt: Date                                  │ │
│  │  updatedAt: Date                                  │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   orders Collection                      │
│  ┌───────────────────────────────────────────────────┐ │
│  │  _id: ObjectId                                    │ │
│  │  user: ObjectId (ref: 'User')                     │ │
│  │  items: [                                         │ │
│  │    {                                              │ │
│  │      product: ObjectId (ref: 'Product')           │ │
│  │      name: String                                 │ │
│  │      quantity: Number                             │ │
│  │      price: Number                                │ │
│  │    }                                              │ │
│  │  ]                                                │ │
│  │  totalAmount: Number (required)                   │ │
│  │  status: String (enum: [pending, processing,      │ │
│  │                         shipped, delivered,       │ │
│  │                         cancelled])               │ │
│  │  shippingAddress: {                               │ │
│  │    street: String                                 │ │
│  │    city: String                                   │ │
│  │    state: String                                  │ │
│  │    zipCode: String                                │ │
│  │    country: String                                │ │
│  │  }                                                │ │
│  │  paymentMethod: String                            │ │
│  │  paymentStatus: String (default: 'pending')       │ │
│  │  createdAt: Date                                  │ │
│  │  updatedAt: Date                                  │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Layer 1: Frontend                     │
│  - Protected Routes (ProtectedRoute component)          │
│  - Admin Routes (AdminRoute component)                  │
│  - Form Validation                                      │
│  - Token Storage (localStorage)                         │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                    Layer 2: Network                      │
│  - HTTPS (production)                                   │
│  - CORS Configuration                                   │
│  - JWT Token in Headers                                 │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Layer 3: Middleware                     │
│  - Auth Middleware (JWT verification)                   │
│  - Authorize Middleware (role check)                    │
│  - Validation Middleware (input validation)             │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                  Layer 4: Controllers                    │
│  - Business Logic Validation                            │
│  - Stock Checks                                         │
│  - Ownership Verification                               │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   Layer 5: Database                      │
│  - Schema Validation                                    │
│  - Unique Constraints                                   │
│  - Password Hashing (pre-save hook)                     │
│  - MongoDB Injection Prevention                         │
└─────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                      │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Frontend (Vercel/Netlify)                     │    │
│  │  - Static files served via CDN                 │    │
│  │  - Environment: VITE_API_URL                   │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│                   │ HTTPS                                │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Backend (Heroku/Railway/Render)               │    │
│  │  - Node.js server                              │    │
│  │  - Environment variables                       │    │
│  │  - CORS configured for frontend domain         │    │
│  └────────────────┬───────────────────────────────┘    │
│                   │                                      │
│                   │ MongoDB Protocol                     │
│                   │                                      │
│  ┌────────────────▼───────────────────────────────┐    │
│  │  Database (MongoDB Atlas)                      │    │
│  │  - Cloud-hosted MongoDB                        │    │
│  │  - Automatic backups                           │    │
│  │  - Replica sets                                │    │
│  └────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

This architecture provides a clear, scalable, and maintainable structure for the E-Commerce application!