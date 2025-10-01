# 🚀 Quick Start Guide

Get the E-Commerce application up and running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js installed (v16+): `node --version`
- ✅ MongoDB installed and running: `mongod --version`
- ✅ npm installed: `npm --version`

## Step 1: Start MongoDB

### Windows
```bash
# Start MongoDB service
net start MongoDB

# Or run mongod directly
mongod
```

### Mac/Linux
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or run mongod directly
mongod --dbpath /path/to/data
```

Verify MongoDB is running:
```bash
mongosh
# Should connect successfully
```

## Step 2: Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies (first time only)
npm install

# Create environment file
cp .env.example .env

# Start the backend server
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

**Backend is now running at http://localhost:5000**

## Step 3: Setup Frontend

Open a **NEW terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (first time only)
npm install

# Start the frontend dev server
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

**Frontend is now running at http://localhost:3000**

## Step 4: Test the Application

### Create Your First User

1. Open browser: http://localhost:3000
2. Click "Sign Up"
3. Fill in:
   - Name: Your Name
   - Email: your@email.com
   - Password: password123
4. Click "Sign Up"

You're now logged in! 🎉

### Create Admin User (Optional)

In a new terminal:

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

Now you can login as admin and access http://localhost:3000/admin

### Add Sample Products (Admin Only)

1. Login as admin
2. Go to http://localhost:3000/admin/products
3. Click "Add Product"
4. Fill in product details:
   - Name: Laptop
   - Description: High-performance laptop
   - Price: 999.99
   - Stock: 50
   - Category: electronics
   - Image: https://via.placeholder.com/400x300?text=Laptop
5. Click "Add Product"

Repeat for more products!

### Test Shopping Flow

1. **Browse Products**: Go to home page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click cart icon in navbar
4. **Checkout**: Click "Proceed to Checkout"
5. **Place Order**: Fill shipping info and click "Place Order"
6. **View Orders**: Click "Orders" in navbar

## 🎯 Quick Commands Reference

### Backend Commands
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start development server
npm start            # Start production server
```

### Frontend Commands
```bash
cd frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🔧 Troubleshooting

### Backend won't start

**Problem**: MongoDB connection error
```bash
# Solution: Start MongoDB
mongod
# Or on Windows:
net start MongoDB
```

**Problem**: Port 5000 already in use
```bash
# Solution: Change port in backend/.env
PORT=5001
```

### Frontend won't start

**Problem**: Port 3000 already in use
```bash
# Solution: Vite will automatically suggest another port
# Press 'y' to use it
```

**Problem**: API connection failed
```bash
# Solution: Ensure backend is running on port 5000
# Check backend terminal for errors
```

### Can't login

**Problem**: Invalid credentials
```bash
# Solution: Make sure you're using the correct email/password
# Or create a new account via signup
```

### Cart not working

**Problem**: Not logged in
```bash
# Solution: Login first, then add items to cart
```

## 📱 Access Points

After setup, you can access:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

### Frontend Routes
- `/` - Home (Products)
- `/products/:id` - Product Details
- `/login` - Login
- `/signup` - Sign Up
- `/cart` - Shopping Cart (protected)
- `/checkout` - Checkout (protected)
- `/orders` - Order History (protected)
- `/admin` - Admin Dashboard (admin only)
- `/admin/products` - Manage Products (admin only)
- `/admin/orders` - Manage Orders (admin only)

### API Endpoints
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/products` - Get products
- `POST /api/cart` - Add to cart
- `POST /api/orders` - Create order

## 🎓 Next Steps

1. **Explore the UI**: Browse products, add to cart, place orders
2. **Test Admin Features**: Login as admin and manage products/orders
3. **Read Documentation**: Check README.md for detailed info
4. **Review Code**: Explore the codebase to understand the architecture
5. **Customize**: Modify styles, add features, make it your own!

## 📚 Additional Resources

- [Backend README](./backend/README.md) - Complete API documentation
- [Frontend README](./frontend/README.md) - Frontend guide
- [API Testing Guide](./backend/API_TESTING_GUIDE.md) - Testing workflows
- [Architecture](./backend/ARCHITECTURE.md) - System design
- [Postman Collection](./backend/postman_collection.json) - API testing

## 🎉 You're All Set!

Your E-Commerce application is now running. Happy coding! 🚀

---

**Need Help?**
- Check the troubleshooting section above
- Review the detailed README.md
- Check browser console for frontend errors
- Check terminal for backend errors