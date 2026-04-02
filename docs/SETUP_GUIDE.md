# E-Commerce Application - Complete Setup Guide

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Project Structure](#project-structure)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v18 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version`

- **npm** (v9 or higher) or **yarn**
  - Comes with Node.js
  - Verify: `npm --version`

- **MongoDB** (v6 or higher)
  - Option 1: Local installation - https://www.mongodb.com/try/download/community
  - Option 2: MongoDB Atlas (Cloud) - https://www.mongodb.com/cloud/atlas
  - Verify: `mongod --version`

- **Git**
  - Download: https://git-scm.com/
  - Verify: `git --version`

### Optional Tools

- **MongoDB Compass**: GUI for MongoDB
- **Postman**: API testing tool
- **VS Code**: Recommended code editor

---

## Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd E-commerce
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

**Backend Dependencies:**
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcryptjs`: Password hashing
- `jsonwebtoken`: JWT authentication
- `dotenv`: Environment variables
- `cors`: Cross-origin resource sharing
- `express-validator`: Input validation

**Dev Dependencies:**
- `nodemon`: Auto-restart server
- `jest`: Testing framework
- `supertest`: HTTP testing
- `mongodb-memory-server`: In-memory MongoDB for tests

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

**Frontend Dependencies:**
- `react`: UI library
- `react-dom`: React DOM renderer
- `react-router-dom`: Routing
- `axios`: HTTP client
- `react-icons`: Icon library

**Dev Dependencies:**
- `vite`: Build tool
- `tailwindcss`: CSS framework
- `@testing-library/react`: Component testing
- `vitest`: Test runner

---

## Environment Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

**Edit `backend/.env`:**

```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
CLIENT_URL=http://localhost:5173
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
cd ../frontend
cp .env.example .env
```

**Edit `frontend/.env`:**

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# For production:
# VITE_API_URL=https://your-backend-url.com/api
```

### Environment Variables Explained

#### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/ecommerce` |
| `JWT_SECRET` | Secret key for JWT tokens | Random 32+ character string |
| `JWT_EXPIRE` | JWT token expiration | `7d`, `24h`, `30m` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:3000` |

#### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

### Generating Secure JWT Secret

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -hex 32
```

**Option 3: Online Generator**
- Visit: https://randomkeygen.com/

---

## Database Setup

### Option 1: Local MongoDB

#### 1. Start MongoDB Service

**Windows:**
```bash
# Start MongoDB service
net start MongoDB

# Or run mongod directly
mongod --dbpath C:\data\db
```

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

#### 2. Verify MongoDB is Running

```bash
# Connect to MongoDB shell
mongosh

# Or check status
mongosh --eval "db.adminCommand('ping')"
```

#### 3. Create Database (Optional)

MongoDB will create the database automatically when you first insert data, but you can create it manually:

```bash
mongosh
use ecommerce
db.createCollection("users")
exit
```

### Option 2: MongoDB Atlas (Cloud)

#### 1. Create Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new cluster (Free tier available)

#### 2. Configure Network Access

1. Go to "Network Access" in Atlas dashboard
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

#### 3. Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Create username and password
4. Grant "Read and write to any database" permission

#### 4. Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `ecommerce`

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

#### 5. Update Backend .env

```env
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

### Seed Database (Optional)

You can create a seed script to populate the database with sample data:

**Create `backend/seed.js`:**

```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    
    // Create admin user
    await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      role: 'admin'
    });
    
    // Create sample products
    await Product.create([
      {
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 999.99,
        category: 'Electronics',
        stock: 10,
        image: 'https://via.placeholder.com/400x300?text=Laptop'
      },
      // Add more products...
    ]);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
```

**Run seed script:**
```bash
cd backend
node seed.js
```

---

## Running the Application

### Development Mode

#### 1. Start Backend Server

```bash
cd backend
npm run dev
```

**Expected Output:**
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

**Backend will be available at:** http://localhost:5000

#### 2. Start Frontend Development Server

Open a new terminal:

```bash
cd frontend
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

**Frontend will be available at:** http://localhost:3000

### Production Mode

#### 1. Build Frontend

```bash
cd frontend
npm run build
```

This creates an optimized production build in `frontend/dist/`

#### 2. Start Backend in Production Mode

```bash
cd backend
NODE_ENV=production npm start
```

#### 3. Serve Frontend (Optional)

You can serve the built frontend using a static file server:

```bash
cd frontend
npm install -g serve
serve -s dist -p 3000
```

---

## Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run with coverage report
npm test -- --coverage
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

### Test Coverage

After running tests with coverage, open the coverage report:

**Backend:**
```bash
cd backend
open coverage/lcov-report/index.html
```

**Frontend:**
```bash
cd frontend
open coverage/index.html
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. MongoDB Connection Error

**Error:**
```
MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions:**
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check MongoDB URI in `.env` file
- Verify MongoDB is listening on port 27017: `netstat -an | grep 27017`

#### 2. Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9
```

**Or change port in `.env`:**
```env
PORT=5001
```

#### 3. CORS Errors

**Error:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solutions:**
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Ensure backend CORS configuration includes your frontend URL
- Check that both servers are running

#### 4. JWT Token Errors

**Error:**
```
JsonWebTokenError: invalid token
```

**Solutions:**
- Ensure `JWT_SECRET` is set in backend `.env`
- Clear browser localStorage and login again
- Verify token is being sent in Authorization header

#### 5. Module Not Found

**Error:**
```
Error: Cannot find module 'express'
```

**Solutions:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use npm ci for clean install
npm ci
```

#### 6. Environment Variables Not Loading

**Error:**
```
undefined is not a valid MongoDB URI
```

**Solutions:**
- Ensure `.env` file exists in correct directory
- Check `.env` file has no syntax errors
- Restart the server after changing `.env`
- Verify variable names match exactly (case-sensitive)

#### 7. Build Errors

**Error:**
```
Failed to compile
```

**Solutions:**
```bash
# Clear cache and rebuild
npm run build -- --force

# Or delete build artifacts
rm -rf dist node_modules/.vite
npm run build
```

---

## Project Structure

```
E-commerce/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Auth logic
│   │   ├── productController.js # Product logic
│   │   ├── cartController.js    # Cart logic
│   │   └── orderController.js   # Order logic
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   ├── errorHandler.js      # Error handling
│   │   ├── asyncHandler.js      # Async wrapper
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Product.js           # Product schema
│   │   ├── Cart.js              # Cart schema
│   │   └── Order.js             # Order schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── productRoutes.js     # Product endpoints
│   │   ├── cartRoutes.js        # Cart endpoints
│   │   └── orderRoutes.js       # Order endpoints
│   ├── tests/
│   │   ├── unit/                # Unit tests
│   │   └── integration/         # Integration tests
│   ├── utils/
│   │   └── generateToken.js     # JWT utilities
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   ├── package.json             # Dependencies
│   └── server.js                # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCard.test.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Auth state
│   │   │   └── CartContext.jsx  # Cart state
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   └── admin/
│   │   ├── services/
│   │   │   └── api.js           # Axios configuration
│   │   ├── App.jsx              # Main component
│   │   ├── main.jsx             # Entry point
│   │   ├── index.css            # Global styles
│   │   └── setupTests.js        # Test configuration
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   ├── package.json             # Dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   └── index.html               # HTML template
│
├── .github/
│   └── workflows/
│       └── deploy.yml           # CI/CD pipeline
├── scripts/
│   ├── deploy-backend.sh        # Backend deployment
│   └── deploy-frontend.sh       # Frontend deployment
├── docker-compose.yml           # Docker orchestration
├── SETUP_GUIDE.md              # This file
├── TESTING_DOCUMENTATION.md    # Testing guide
├── DEPLOYMENT.md               # Deployment guide
└── README.md                   # Project overview
```

---

## Quick Start Checklist

- [ ] Install Node.js (v18+)
- [ ] Install MongoDB or create MongoDB Atlas account
- [ ] Clone repository
- [ ] Install backend dependencies: `cd backend && npm install`
- [ ] Install frontend dependencies: `cd frontend && npm install`
- [ ] Create backend `.env` file with MongoDB URI and JWT secret
- [ ] Create frontend `.env` file with API URL
- [ ] Start MongoDB service (if using local MongoDB)
- [ ] Start backend server: `cd backend && npm run dev`
- [ ] Start frontend server: `cd frontend && npm run dev`
- [ ] Open browser to http://localhost:3000
- [ ] Run tests: `npm test` in both backend and frontend directories

---

## Next Steps

After completing the setup:

1. **Explore the Application**
   - Create an account
   - Browse products
   - Add items to cart
   - Place an order

2. **Test the APIs**
   - Use cURL or API testing tools
   - Test authentication endpoints
   - Test CRUD operations

3. **Run Tests**
   - Execute backend tests
   - Execute frontend tests
   - Check test coverage

4. **Customize**
   - Add your own products
   - Modify styling
   - Add new features

5. **Deploy**
   - Follow `DEPLOYMENT.md` for deployment instructions
   - Deploy to Render, Netlify, or your preferred platform

---

## Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review the [Testing Documentation](TESTING_DOCUMENTATION.md)
3. Check the [Deployment Guide](DEPLOYMENT.md)
4. Review error logs in the console
5. Ensure all environment variables are set correctly

---

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [JWT Introduction](https://jwt.io/introduction)

---

**Happy Coding! 🚀**