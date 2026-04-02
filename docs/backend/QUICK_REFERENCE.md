# Quick Reference Card

## 🚀 Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server: `http://localhost:5000`

## 🔑 Authentication Headers

```
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## 📋 Essential Endpoints

### Auth
```
POST   /api/auth/signup      # Register (body: name, email, password, role)
POST   /api/auth/login       # Login (body: email, password)
GET    /api/auth/me          # Get current user [Protected]
```

### Products
```
GET    /api/products         # Get all (query: category, minPrice, maxPrice, search)
GET    /api/products/:id     # Get one
POST   /api/products         # Create [Admin]
PUT    /api/products/:id     # Update [Admin]
DELETE /api/products/:id     # Delete [Admin]
```

### Cart
```
GET    /api/cart             # Get cart [Protected]
POST   /api/cart             # Add item (body: productId, quantity) [Protected]
PUT    /api/cart/:productId  # Update quantity (body: quantity) [Protected]
DELETE /api/cart/:productId  # Remove item [Protected]
DELETE /api/cart             # Clear cart [Protected]
```

### Orders
```
POST   /api/orders           # Create (body: shippingAddress, paymentMethod) [Protected]
GET    /api/orders           # Get user orders [Protected]
GET    /api/orders/:id       # Get one order [Protected]
PUT    /api/orders/:id/cancel # Cancel order [Protected]
GET    /api/orders/admin/all # Get all orders [Admin]
PUT    /api/orders/:id/status # Update status (body: status) [Admin]
```

## 📦 Request Body Examples

### Signup
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Login
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Product
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "stock": 50,
  "image": "image.jpg",
  "category": "electronics"
}
```

### Add to Cart
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Create Order
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

### Update Order Status
```json
{
  "status": "shipped"
}
```

## 🎭 User Roles

- **user**: Can browse products, manage cart, create orders
- **admin**: Can do everything + manage products, view all orders

## 📊 Order Status Values

- `pending` - Order placed
- `processing` - Being prepared
- `shipped` - On the way
- `delivered` - Completed
- `cancelled` - Cancelled

## 🔍 Product Query Filters

```
GET /api/products?category=electronics
GET /api/products?minPrice=100&maxPrice=1000
GET /api/products?search=laptop
GET /api/products?category=electronics&minPrice=500&search=pro
```

## ⚡ Quick Test Commands

### Create Admin
```bash
curl -X POST http://localhost:5000/api/auth/signup -H "Content-Type: application/json" -d "{\"name\":\"Admin\",\"email\":\"admin@example.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"admin123\"}"
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Create Product (replace TOKEN)
```bash
curl -X POST http://localhost:5000/api/products -H "Content-Type: application/json" -H "Authorization: Bearer TOKEN" -d "{\"name\":\"Laptop\",\"description\":\"High-performance\",\"price\":999.99,\"stock\":50}"
```

## 🛠️ Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000
```

## 📁 Important Files

- `server.js` - Entry point
- `.env` - Configuration
- `README.md` - Full documentation
- `QUICKSTART.md` - Setup guide
- `API_TESTING_GUIDE.md` - Testing guide
- `postman_collection.json` - Postman collection

## 🐛 Common Issues

### MongoDB not running
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### Port in use
Change `PORT` in `.env` file

### Token expired
Login again to get new token

## 📞 Response Format

### Success
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error
```json
{
  "success": false,
  "message": "Error message"
}
```

## 🎯 HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

---

**Keep this card handy for quick reference!** 📌