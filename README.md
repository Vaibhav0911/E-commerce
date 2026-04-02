# 🛒 Complete E-Commerce Application

A full-stack E-Commerce web application with Node.js/Express backend and React frontend.

## 📋 Project Overview

This is a production-ready E-Commerce application featuring:

- **Backend**: RESTful API built with Node.js, Express, and MongoDB
- **Frontend**: Modern React SPA with TailwindCSS
- **Authentication**: JWT-based auth with role-based access control
- **Features**: Product management, shopping cart, order processing, admin dashboard

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

All documentation has been organized in the `docs/` folder:

- **[📖 Documentation Index](docs/INDEX.md)** - Complete documentation index
- **[🚀 Quick Start Guide](docs/START.md)** - Super quick launch guide
- **[📋 Setup Guide](docs/SETUP_GUIDE.md)** - Complete setup instructions
- **[✨ Features](docs/FEATURES.md)** - Detailed feature list
- **[🏗️ Architecture](docs/ARCHITECTURE_OVERVIEW.md)** - System architecture
- **[📦 Adding Products](docs/ADDING_PRODUCTS.md)** - Product seeding guide

### Backend Documentation
- **[🔧 Backend README](docs/backend/README.md)** - Backend API documentation
- **[🏗️ Backend Architecture](docs/backend/ARCHITECTURE.md)** - Backend system design
- **[🧪 API Testing](docs/backend/API_TESTING_GUIDE.md)** - Backend API testing
- **[📋 Backend Quick Reference](docs/backend/QUICK_REFERENCE.md)** - Backend reference

### Frontend Documentation
- **[⚛️ Frontend README](docs/frontend/README.md)** - Frontend application guide

## 🏗️ Project Structure

```
E-commerce/
├── docs/                    # 📚 All documentation
├── backend/                 # 🔧 Node.js + Express API
├── frontend/                # ⚛️ React + Vite application
└── README.md               # 📄 This file
```

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
✅ Create, update, and delete products
✅ View all orders
✅ Update order status
✅ Manage inventory

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **Icons**: React Icons

## 📞 Support

For detailed documentation, setup guides, and troubleshooting, please see the [docs/](docs/) folder.

---

**📚 [View Full Documentation](docs/INDEX.md)**</content>
<parameter name="filePath">i:\Collection\Desktop\E-commerce\README.md