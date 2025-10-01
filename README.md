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
└── README.md              # This file
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
- [Postman Collection](./backend/postman_collection.json) - Import for testing

### Frontend Documentation
- [Frontend README](./frontend/README.md) - Complete frontend guide

### Testing & Quality
- **[TESTING_DOCUMENTATION.md](./TESTING_DOCUMENTATION.md)** - Comprehensive testing guide
- Unit tests, integration tests, and best practices

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
✅ **Unit & Integration tests with Jest + Supertest**  
✅ **Frontend component tests with Vitest + React Testing Library**  
✅ **CI/CD with GitHub Actions**  
✅ **Test coverage reporting**  

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
- **Testing**: Jest, Supertest, MongoDB Memory Server

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: TailwindCSS
- **Icons**: React Icons
- **State Management**: Context API
- **Testing**: Vitest, React Testing Library, jsdom

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

## 🧪 Testing

### Automated Testing

This project includes comprehensive test coverage with **Jest** (backend) and **Vitest** (frontend).

#### Backend Tests (Jest + Supertest)

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

**Test Coverage:**
- ✅ Authentication API (signup, login, JWT validation)
- ✅ Product CRUD operations
- ✅ Cart management
- ✅ Order processing
- ✅ Error handling and validation
- ✅ Integration tests (cart-to-order workflow)

#### Frontend Tests (Vitest + React Testing Library)

```bash
cd frontend

# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run with coverage
npm run test:coverage
```

**Test Coverage:**
- ✅ Component rendering
- ✅ User interactions
- ✅ Authentication flows
- ✅ Cart operations
- ✅ Error states

**📚 Complete Testing Guide:** [TESTING_DOCUMENTATION.md](./TESTING_DOCUMENTATION.md)

### Manual Testing

#### Using Postman
1. Import `backend/postman_collection.json`
2. Set `base_url` variable to `http://localhost:5000/api`
3. Follow the testing workflow in API_TESTING_GUIDE.md

#### Browser Testing
1. Start both backend and frontend servers
2. Navigate to http://localhost:3000
3. Create an account or login
4. Browse products and add to cart
5. Complete checkout process
6. View orders

#### Admin Testing
1. Create admin user (see Default Credentials)
2. Login with admin credentials
3. Access admin dashboard at http://localhost:3000/admin
4. Manage products and orders

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

## 🚀 Deployment

### Quick Deployment Options

**Option 1: Cloud Deployment (Recommended)**
- Backend: [Render](https://render.com) (Free tier)
- Frontend: [Netlify](https://netlify.com) or [Vercel](https://vercel.com) (Free tier)
- Database: [MongoDB Atlas](https://mongodb.com/cloud/atlas) (Free tier)

**Option 2: Docker Deployment**
- Use Docker Compose for containerized deployment
- See [DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)

**Option 3: Manual Deployment**
- Deploy to any VPS (DigitalOcean, AWS, etc.)

### Deployment Guides

📚 **Comprehensive Guides Available:**
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide with step-by-step instructions
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Quick checklist for deployment
- **[DOCKER_DEPLOYMENT.md](./DOCKER_DEPLOYMENT.md)** - Docker and Docker Compose guide

### Quick Deploy with Scripts

**Windows (PowerShell):**
```powershell
# Deploy backend
.\scripts\deploy-backend.ps1

# Deploy frontend
.\scripts\deploy-frontend.ps1
```

**Linux/Mac:**
```bash
# Deploy backend
chmod +x scripts/deploy-backend.sh
./scripts/deploy-backend.sh

# Deploy frontend
chmod +x scripts/deploy-frontend.sh
./scripts/deploy-frontend.sh
```

### CI/CD with GitHub Actions

Automated deployment is configured in `.github/workflows/deploy.yml`:
- ✅ Runs tests on every push
- ✅ Builds frontend automatically
- ✅ Deploys to Render (backend) on push to main
- ✅ Deploys to Netlify (frontend) on push to main

**Setup GitHub Actions:**
1. Add secrets in GitHub repository settings:
   - `VITE_API_URL` - Your backend API URL
   - `RENDER_DEPLOY_HOOK` - Render deploy hook URL
   - `NETLIFY_AUTH_TOKEN` - Netlify authentication token
   - `NETLIFY_SITE_ID` - Netlify site ID

2. Push to main branch - automatic deployment!

### Environment Variables for Production

**Backend (.env):**
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=<generate-secure-random-string>
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app.netlify.app
CLIENT_URL=https://your-app.netlify.app
```

**Frontend (.env.production):**
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

### Deployment Files Included

- ✅ `backend/render.yaml` - Render configuration
- ✅ `frontend/netlify.toml` - Netlify configuration
- ✅ `frontend/vercel.json` - Vercel configuration
- ✅ `.github/workflows/deploy.yml` - GitHub Actions CI/CD
- ✅ `docker-compose.yml` - Docker Compose configuration
- ✅ `backend/Dockerfile` - Backend Docker image
- ✅ `frontend/Dockerfile` - Frontend Docker image

**Total Cost: $0/month** (using free tiers)

## 🔒 Security Considerations

- ✅ Passwords are hashed with bcrypt (10 salt rounds)
- ✅ JWT tokens expire after 7 days
- ✅ Protected routes require authentication
- ✅ Admin routes require admin role
- ✅ Input validation on all endpoints
- ✅ CORS configured for specific origins
- ⚠️ Change JWT_SECRET in production
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting for production
- ⚠️ Add helmet.js for security headers

## 📈 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search and filters
- [ ] Pagination
- [ ] Image upload (Cloudinary/AWS S3)
- [ ] Order tracking
- [ ] Inventory alerts
- [ ] Sales analytics
- [ ] Discount codes/coupons
- [ ] Multi-language support
- [ ] Dark mode

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues and questions:
- Check the documentation in backend/ and frontend/ folders
- Review the API_TESTING_GUIDE.md for testing workflows
- Check browser console and server logs for errors

## 👨‍💻 Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev  # Runs with Vite HMR
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