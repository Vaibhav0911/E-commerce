# 🛒 Complete E-Commerce Application

A full-stack E-Commerce web application with Node.js/Express backend and React frontend.

## 📋 Project Overview

This is a production-ready E-Commerce application featuring:

- **Backend**: RESTful API built with Node.js, Express, and MongoDB
- **Frontend**: Modern React SPA with TailwindCSS
- **Authentication**: JWT-based auth with role-based access control
- **Features**: Product management, shopping cart, order processing, admin dashboard

## 🏗️ Project Structure

```
E-commerce/
├── docs/                    # Documentation
├── backend/                 # Node.js + Express API
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth, validation, error handling
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── utils/              # Helper functions
│   └── server.js           # Entry point
│
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # State management
│   │   ├── pages/         # Page components
│   │   └── services/      # API integration
│   └── public/            # Static assets
│
└── README.md              # This file (in docs/)
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd E-commerce
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file
   cp .env.example .env
   # Edit .env with your MongoDB URI and JWT secret
   
   # Start backend server
   npm run dev
   ```
   Backend will run on http://localhost:5000

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   
   # Start frontend dev server
   npm run dev
   ```
   Frontend will run on http://localhost:3000

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## 📚 Documentation

### Getting Started
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup instructions with troubleshooting
- **[START.md](./START.md)** - Quick start guide

### Backend Documentation
- [Backend README](./backend/README.md) - Complete API documentation
- [Quick Start Guide](./backend/QUICKSTART.md) - Step-by-step setup
- [API Testing Guide](./backend/API_TESTING_GUIDE.md) - Testing workflows
- [Architecture](./backend/ARCHITECTURE.md) - System design

### Frontend Documentation
- [Frontend README](./frontend/README.md) - Complete frontend guide

### Development
- **[ADDING_PRODUCTS.md](./ADDING_PRODUCTS.md)** - Product seeding and data setup

### Deployment
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Quick deployment checklist
- **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - Docker guide

## 🎯 Features

### User Features
✅ User registration and authentication  
✅ Browse products with search and filters  
✅ View product details  
✅ Add/remove items to/from cart  
✅ Update cart quantities  
✅ Place orders with shipping information  
✅ View order history  
✅ Cancel pending orders  

### Admin Features
✅ Admin dashboard with statistics  
✅ Create, update, delete products  
✅ View all orders  
✅ Update order status  
✅ Manage inventory  

### Technical Features
✅ JWT authentication with 7-day expiry  
✅ Password hashing with bcrypt  
✅ Role-based authorization (user/admin)  
✅ Input validation and sanitization  
✅ Comprehensive error handling with proper status codes  
✅ CORS configuration  
✅ RESTful API design  
✅ MongoDB with Mongoose ODM  
✅ React Context API for state management  
✅ Protected routes  
✅ Responsive design with TailwindCSS  

## 🔐 Default Credentials

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Create Regular User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Or use the signup page at http://localhost:3000/signup

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Environment**: dotenv
- **CORS**: cors

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **Icons**: React Icons
- **State Management**: Context API

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders/admin/all` - Get all orders (admin)
- `PUT /api/orders/:id/status` - Update order status (admin)

## 🔧 Configuration

### Backend Environment Variables
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

## 📦 Build for Production

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### Backend Issues
- **MongoDB Connection Failed**: Check if MongoDB is running and URI is correct
- **Port Already in Use**: Change PORT in .env file
- **JWT Errors**: Verify JWT_SECRET is set in .env

### Frontend Issues
- **API Connection Failed**: Ensure backend is running on port 5000
- **CORS Errors**: Check CORS configuration in backend
- **Build Errors**: Delete node_modules and reinstall dependencies

### Common Issues
- **Cart Not Updating**: Ensure user is logged in
- **Admin Routes Not Working**: Verify user has admin role
- **Images Not Loading**: Check image URLs or use placeholder
```

### Database Management
- Use MongoDB Compass for GUI
- Or use mongo shell for CLI

## 🎓 Learning Resources

This project demonstrates:
- RESTful API design
- JWT authentication
- Role-based authorization
- MongoDB/Mongoose relationships
- React hooks and Context API
- Protected routes
- Form handling and validation
- State management
- Responsive design
- Error handling

Perfect for learning full-stack development!

---

**Built with ❤️ using Node.js, Express, MongoDB, React, and TailwindCSS**