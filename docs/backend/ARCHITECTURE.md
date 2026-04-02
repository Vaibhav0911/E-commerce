# System Architecture

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT                               │
│                  (Frontend Application)                      │
│              React / Vue / Angular / Mobile                  │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP Requests (JSON)
                     │ Authorization: Bearer <JWT>
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXPRESS SERVER                            │
│                   (Port 5000)                                │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              MIDDLEWARE LAYER                       │    │
│  │  • CORS                                            │    │
│  │  • Body Parser (JSON)                              │    │
│  │  • Authentication (JWT Verify)                     │    │
│  │  • Authorization (Role Check)                      │    │
│  │  • Validation (Input Sanitization)                 │    │
│  │  • Error Handler                                   │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │                  ROUTES                             │    │
│  │  • /api/auth/*      → authRoutes                   │    │
│  │  • /api/products/*  → productRoutes                │    │
│  │  • /api/cart/*      → cartRoutes                   │    │
│  │  • /api/orders/*    → orderRoutes                  │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │               CONTROLLERS                           │    │
│  │  • authController    (signup, login, getMe)        │    │
│  │  • productController (CRUD operations)             │    │
│  │  • cartController    (cart management)             │    │
│  │  • orderController   (order processing)            │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
│  ┌────────────────────────────────────────────────────┐    │
│  │                  MODELS                             │    │
│  │  • User Model      (Mongoose Schema)               │    │
│  │  • Product Model   (Mongoose Schema)               │    │
│  │  • Cart Model      (Mongoose Schema)               │    │
│  │  • Order Model     (Mongoose Schema)               │    │
│  └────────────────────────────────────────────────────┘    │
│                         │                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │ Mongoose ODM
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB DATABASE                          │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  users   │  │ products │  │  carts   │  │  orders  │   │
│  │          │  │          │  │          │  │          │   │
│  │ • _id    │  │ • _id    │  │ • _id    │  │ • _id    │   │
│  │ • name   │  │ • name   │  │ • user   │  │ • user   │   │
│  │ • email  │  │ • desc   │  │ • items  │  │ • items  │   │
│  │ • pass   │  │ • price  │  │          │  │ • total  │   │
│  │ • role   │  │ • stock  │  │          │  │ • status │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow

### 1. Authentication Flow (Signup/Login)

```
Client Request
    │
    ├─→ POST /api/auth/signup
    │   └─→ Validation Middleware
    │       └─→ authController.signup
    │           ├─→ Check if user exists
    │           ├─→ Hash password (bcrypt)
    │           ├─→ Create user in DB
    │           ├─→ Generate JWT token
    │           └─→ Return user + token
    │
    └─→ POST /api/auth/login
        └─→ Validation Middleware
            └─→ authController.login
                ├─→ Find user by email
                ├─→ Compare password (bcrypt)
                ├─→ Generate JWT token
                └─→ Return user + token
```

### 2. Protected Route Flow (e.g., Create Product)

```
Client Request + JWT Token
    │
    └─→ POST /api/products
        │
        ├─→ Authentication Middleware
        │   ├─→ Extract token from header
        │   ├─→ Verify JWT token
        │   ├─→ Get user from token
        │   └─→ Attach user to request
        │
        ├─→ Authorization Middleware
        │   ├─→ Check user role
        │   └─→ Verify admin access
        │
        ├─→ Validation Middleware
        │   └─→ Validate input data
        │
        └─→ productController.createProduct
            ├─→ Create product in DB
            └─→ Return created product
```

### 3. Shopping Flow

```
User Journey:
    │
    ├─→ 1. Browse Products
    │   └─→ GET /api/products (Public)
    │
    ├─→ 2. Add to Cart
    │   └─→ POST /api/cart (Protected)
    │       ├─→ Verify stock availability
    │       ├─→ Create/Update cart
    │       └─→ Return updated cart
    │
    ├─→ 3. View Cart
    │   └─→ GET /api/cart (Protected)
    │       └─→ Return cart with populated products
    │
    ├─→ 4. Update Cart
    │   └─→ PUT /api/cart/:productId (Protected)
    │       ├─→ Verify stock
    │       └─→ Update quantity
    │
    └─→ 5. Create Order
        └─→ POST /api/orders (Protected)
            ├─→ Get cart items
            ├─→ Verify stock for all items
            ├─→ Calculate total amount
            ├─→ Reduce product stock
            ├─→ Create order
            ├─→ Clear cart
            └─→ Return order details
```

## 🔐 Security Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Security Layers                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Layer 1: CORS                                          │
│  └─→ Restrict cross-origin requests                    │
│                                                          │
│  Layer 2: Input Validation                             │
│  └─→ Sanitize and validate all inputs                  │
│                                                          │
│  Layer 3: Authentication                                │
│  └─→ Verify JWT token on protected routes              │
│                                                          │
│  Layer 4: Authorization                                 │
│  └─→ Check user roles and permissions                  │
│                                                          │
│  Layer 5: Password Security                             │
│  └─→ Hash passwords with bcrypt (10 rounds)            │
│                                                          │
│  Layer 6: Error Handling                                │
│  └─→ Don't expose sensitive information                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📊 Data Relationships

```
┌──────────────┐
│     User     │
│              │
│  • _id       │◄─────────┐
│  • name      │          │
│  • email     │          │ References
│  • password  │          │
│  • role      │          │
└──────────────┘          │
       │                  │
       │ Creates          │
       │                  │
       ▼                  │
┌──────────────┐          │
│   Product    │          │
│              │          │
│  • _id       │◄─────┐   │
│  • name      │      │   │
│  • price     │      │   │
│  • stock     │      │   │
│  • createdBy │──────┘   │
└──────────────┘          │
       │                  │
       │ Referenced by    │
       │                  │
       ├──────────────────┼──────────┐
       │                  │          │
       ▼                  ▼          ▼
┌──────────────┐   ┌──────────────┐ │
│     Cart     │   │    Order     │ │
│              │   │              │ │
│  • user      │───┤  • user      │─┘
│  • items[]   │   │  • items[]   │
│    - product │───┤    - product │───┐
│    - qty     │   │    - qty     │   │
└──────────────┘   │    - price   │   │
                   │  • total     │   │
                   │  • status    │   │
                   └──────────────┘   │
                          │            │
                          └────────────┘
                          References Product
```

## 🎯 API Design Pattern

```
RESTful API Structure:

Resource: Products
├─→ GET    /api/products       (Get all - List)
├─→ GET    /api/products/:id   (Get one - Read)
├─→ POST   /api/products       (Create)
├─→ PUT    /api/products/:id   (Update)
└─→ DELETE /api/products/:id   (Delete)

Resource: Cart (User-specific)
├─→ GET    /api/cart           (Get user's cart)
├─→ POST   /api/cart           (Add item)
├─→ PUT    /api/cart/:id       (Update item)
└─→ DELETE /api/cart/:id       (Remove item)

Resource: Orders
├─→ GET    /api/orders         (Get user's orders)
├─→ GET    /api/orders/:id     (Get one order)
├─→ POST   /api/orders         (Create order)
└─→ PUT    /api/orders/:id/*   (Update order)
```

## 🔄 Middleware Chain

```
Request → CORS → Body Parser → Route Handler → [Auth] → [Authorize] → [Validate] → Controller → Response
                                                  ↓
                                            If Protected
                                                  ↓
                                         Verify JWT Token
                                                  ↓
                                            Check Role
                                                  ↓
                                         Validate Input
                                                  ↓
                                        Execute Business Logic
                                                  ↓
                                         Return Response
                                                  ↓
                                         Error Handler (if error)
```

## 📦 Module Dependencies

```
server.js
    │
    ├─→ config/database.js
    │   └─→ mongoose
    │
    ├─→ routes/*
    │   ├─→ controllers/*
    │   │   └─→ models/*
    │   │       └─→ mongoose
    │   │
    │   └─→ middleware/*
    │       ├─→ auth.js
    │       │   ├─→ jsonwebtoken
    │       │   └─→ models/User
    │       │
    │       ├─→ validation.js
    │       │   └─→ express-validator
    │       │
    │       └─→ errorHandler.js
    │
    └─→ utils/*
        └─→ generateToken.js
            └─→ jsonwebtoken
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Production Setup                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend (Vercel/Netlify)                             │
│       │                                                  │
│       │ HTTPS                                           │
│       ▼                                                  │
│  Backend (Heroku/AWS/Railway)                          │
│       │                                                  │
│       │ Mongoose                                        │
│       ▼                                                  │
│  MongoDB Atlas (Cloud Database)                        │
│                                                          │
│  Environment Variables:                                 │
│  • MONGODB_URI (Atlas connection string)               │
│  • JWT_SECRET (Strong secret key)                      │
│  • NODE_ENV=production                                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## 📈 Scalability Considerations

```
Current Architecture:
    Single Server → MongoDB

Future Scaling Options:
    ├─→ Load Balancer
    │   ├─→ Server Instance 1
    │   ├─→ Server Instance 2
    │   └─→ Server Instance N
    │
    ├─→ Redis Cache (for sessions/cart)
    │
    ├─→ MongoDB Replica Set (for high availability)
    │
    ├─→ CDN (for static assets/images)
    │
    └─→ Message Queue (for order processing)
```

---

**This architecture provides a solid foundation for a production-ready E-Commerce application!** 🏗️