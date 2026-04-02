# 🚀 START HERE - Quick Launch Guide

## ⚡ Super Quick Start (Copy & Paste)

### Step 1: Start MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

### Step 2: Start Backend (Terminal 1)
```bash
cd backend
npm run dev
```

Wait for: `✅ MongoDB Connected Successfully` and `🚀 Server running on port 5000`

### Step 3: Start Frontend (Terminal 2 - New Window)
```bash
cd frontend
npm run dev
```

Wait for: `➜  Local:   http://localhost:3000/`

### Step 4: Open Browser
Navigate to: **http://localhost:3000**

---

## 🎯 First Time Setup

If this is your first time running the project:

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Configure Environment

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

The default `.env` should work for local development:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

Default frontend `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📝 Quick Test Checklist

After starting both servers:

1. ✅ Open http://localhost:3000
2. ✅ Click "Sign Up" and create an account
3. ✅ You should be automatically logged in
4. ✅ See your name in the navbar

**Congratulations! Your app is running! 🎉**

---

## 🔧 Troubleshooting

### MongoDB Not Running
```bash
# Check if MongoDB is running
mongosh

# If error, start MongoDB:
# Windows:
net start MongoDB

# Mac/Linux:
sudo systemctl start mongod
```

### Port Already in Use

**Backend (Port 5000):**
Edit `backend/.env`:
```env
PORT=5001
```

**Frontend (Port 3000):**
Vite will automatically ask if you want to use another port. Press `y`.

### Dependencies Not Installed
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Can't Connect to Backend
1. Check backend terminal - should show "Server running on port 5000"
2. Check `frontend/.env` - should have `VITE_API_URL=http://localhost:5000/api`
3. Restart frontend: `Ctrl+C` then `npm run dev`

---

## 🎮 What to Do Next

### Create Admin User
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

Then login with:
- Email: `admin@example.com`
- Password: `admin123`

### Add Sample Products
1. Login as admin
2. Go to http://localhost:3000/admin/products
3. Click "Add Product"
4. Fill in details and save

### Test Shopping Flow
1. Logout from admin
2. Create a regular user account
3. Browse products
4. Add items to cart
5. Go to checkout
6. Place an order
7. View your orders

---

## 📚 Documentation

- **Main Guide**: [README.md](./README.md)
- **Quick Setup**: [QUICKSTART.md](./QUICKSTART.md)
- **Testing**: [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- **Features**: [FEATURES.md](./FEATURES.md)
- **Architecture**: [ARCHITECTURE_OVERVIEW.md](./ARCHITECTURE_OVERVIEW.md)

---

## 🎯 Access Points

Once running:

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Main application |
| Backend API | http://localhost:5000/api | API endpoints |
| Health Check | http://localhost:5000/api/health | API status |

### Frontend Routes
- `/` - Home (Products)
- `/login` - Login
- `/signup` - Sign Up
- `/cart` - Shopping Cart
- `/checkout` - Checkout
- `/orders` - Order History
- `/admin` - Admin Dashboard
- `/admin/products` - Manage Products
- `/admin/orders` - Manage Orders

---

## 💡 Pro Tips

1. **Keep Both Terminals Open**: You need both backend and frontend running
2. **Check Logs**: If something doesn't work, check both terminal windows for errors
3. **Browser Console**: Press F12 to see frontend errors
4. **Hot Reload**: Both servers auto-reload on code changes
5. **MongoDB Compass**: Use MongoDB Compass GUI to view database

---

## 🆘 Need Help?

1. Check [QUICKSTART.md](./QUICKSTART.md) for detailed setup
2. Check [TESTING_GUIDE.md](./TESTING_GUIDE.md) for testing workflows
3. Review terminal logs for errors
4. Check browser console (F12) for frontend errors
5. Verify MongoDB is running: `mongosh`

---

## ✅ Verification Checklist

Before you start developing, verify:

- [ ] MongoDB is running
- [ ] Backend shows "MongoDB Connected Successfully"
- [ ] Backend shows "Server running on port 5000"
- [ ] Frontend shows "Local: http://localhost:3000/"
- [ ] Browser opens http://localhost:3000
- [ ] Can see the home page
- [ ] Can create an account
- [ ] Can login

**All checked? You're ready to go! 🚀**

---

## 🎉 You're All Set!

Your E-Commerce application is now running!

**Happy Coding! 💻**