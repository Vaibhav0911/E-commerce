# E-Commerce Frontend

A modern, responsive React frontend for the E-Commerce application built with Vite, TailwindCSS, and Context API.

## 🚀 Features

### User Features
- **Product Browsing**: View all products with search and category filtering
- **Product Details**: Detailed product information with add to cart functionality
- **Shopping Cart**: Add, update, and remove items from cart
- **Checkout**: Complete order placement with shipping information
- **Order History**: View all past orders and their status
- **Authentication**: Secure login and signup with JWT tokens

### Admin Features
- **Dashboard**: Overview of products, orders, and revenue statistics
- **Product Management**: Create, update, and delete products
- **Order Management**: View all orders and update their status

### Technical Features
- **React Router**: Client-side routing with protected routes
- **Context API**: Global state management for auth and cart
- **Axios**: HTTP client for API communication
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Icons**: Beautiful icon library
- **Vite**: Fast build tool and dev server
- **Responsive Design**: Mobile-first responsive layout

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

## 🛠️ Installation

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:3000

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminRoute.jsx
│   │   └── LoadingSpinner.jsx
│   ├── context/         # Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── NotFound.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── AdminProducts.jsx
│   │       └── AdminOrders.jsx
│   ├── services/        # API services
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Pages Overview

### Public Pages
- **Home (/)**: Browse all products with search and filters
- **Product Details (/products/:id)**: View detailed product information
- **Login (/login)**: User authentication
- **Signup (/signup)**: User registration

### Protected Pages (Require Login)
- **Cart (/cart)**: View and manage shopping cart
- **Checkout (/checkout)**: Complete order with shipping details
- **Orders (/orders)**: View order history

### Admin Pages (Require Admin Role)
- **Admin Dashboard (/admin)**: Statistics and quick actions
- **Manage Products (/admin/products)**: CRUD operations for products
- **Manage Orders (/admin/orders)**: View and update order status

## 🔐 Authentication

The application uses JWT tokens for authentication:
- Tokens are stored in localStorage
- Automatically attached to API requests via Axios interceptor
- Protected routes redirect to login if not authenticated
- Admin routes check for admin role

## 🛒 State Management

### AuthContext
- User authentication state
- Login/Signup/Logout functions
- Admin role checking

### CartContext
- Shopping cart state
- Add/Update/Remove cart items
- Cart total calculations
- Automatic cart fetching on login

## 🎯 API Integration

All API calls are centralized in `src/services/api.js`:

```javascript
// Auth
authAPI.signup(userData)
authAPI.login(credentials)
authAPI.getMe()

// Products
productsAPI.getAll(params)
productsAPI.getById(id)
productsAPI.create(productData)
productsAPI.update(id, productData)
productsAPI.delete(id)

// Cart
cartAPI.getCart()
cartAPI.addToCart(productId, quantity)
cartAPI.updateCartItem(productId, quantity)
cartAPI.removeFromCart(productId)
cartAPI.clearCart()

// Orders
ordersAPI.createOrder(orderData)
ordersAPI.getUserOrders()
ordersAPI.getOrderById(id)
ordersAPI.cancelOrder(id)
ordersAPI.getAllOrders()
ordersAPI.updateOrderStatus(id, status)
```

## 🎨 Styling

The application uses TailwindCSS with custom utility classes:

```css
/* Button Styles */
.btn-primary    /* Primary action button */
.btn-secondary  /* Secondary action button */
.btn-danger     /* Danger/Delete button */

/* Form Styles */
.input-field    /* Standard input field */

/* Layout */
.card           /* Card container */
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## 🚀 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🔍 Preview Production Build

```bash
npm run preview
```

## 🧪 Testing the Application

### 1. Create a User Account
- Navigate to `/signup`
- Fill in name, email, and password
- You'll be automatically logged in

### 2. Browse Products
- View products on home page
- Use search and category filters
- Click on a product for details

### 3. Add to Cart
- Click "Add to Cart" on any product
- View cart badge in navbar
- Navigate to `/cart` to manage items

### 4. Place an Order
- Go to cart and click "Proceed to Checkout"
- Fill in shipping information
- Click "Place Order"
- View order in `/orders`

### 5. Admin Features (Create Admin User)
To test admin features, create a user with admin role via backend API:

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

Then login with admin credentials to access:
- `/admin` - Dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management

## 🔧 Configuration

### Vite Proxy
The Vite dev server is configured to proxy API requests:

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
    }
  }
}
```

### TailwindCSS
Custom theme configuration in `tailwind.config.js`:
- Primary color palette
- Custom utility classes
- Content paths for purging

## 🐛 Troubleshooting

### API Connection Issues
- Ensure backend is running on http://localhost:5000
- Check CORS configuration in backend
- Verify API_URL in environment variables

### Authentication Issues
- Clear localStorage and try logging in again
- Check JWT token expiration (7 days by default)
- Verify backend authentication endpoints

### Cart Not Updating
- Check if user is logged in
- Verify cart API endpoints are working
- Check browser console for errors

## 📦 Dependencies

### Production
- react: ^18.2.0
- react-dom: ^18.2.0
- react-router-dom: ^6.20.0
- axios: ^1.6.2
- react-icons: ^4.12.0

### Development
- vite: ^5.0.8
- @vitejs/plugin-react: ^4.2.1
- tailwindcss: ^3.3.6
- postcss: ^8.4.32
- autoprefixer: ^10.4.16

## 🎯 Future Enhancements

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Pagination for products and orders
- [ ] Image upload for products
- [ ] Email notifications
- [ ] Payment gateway integration
- [ ] Order tracking
- [ ] User profile management
- [ ] Dark mode support

## 📄 License

This project is part of the E-Commerce application suite.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📞 Support

For issues and questions:
- Check the backend API documentation
- Review the browser console for errors
- Ensure all dependencies are installed correctly