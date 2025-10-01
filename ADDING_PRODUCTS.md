# 📦 Adding Products to Your E-Commerce Store

This guide shows you different ways to add products to your E-Commerce application.

## 🚀 Quick Start - Add Sample Products (Recommended)

The easiest way to get started is to use our product seeder script that adds 15 sample products automatically.

### Step 1: Make sure MongoDB is running
```bash
# If using local MongoDB, ensure it's running
# If using MongoDB Atlas, ensure your connection string is in .env
```

### Step 2: Run the seeder script
```bash
cd I:\Collection\Desktop\E-commerce\backend
npm run seed
```

This will add 15 products including:
- 📱 Wireless Bluetooth Headphones ($79.99)
- ⌚ Smart Watch Pro ($199.99)
- 🎒 Laptop Backpack ($49.99)
- 🖱️ Wireless Mouse ($24.99)
- 🔌 USB-C Hub Adapter ($39.99)
- ⌨️ Mechanical Keyboard ($89.99)
- 🔋 Portable Phone Charger ($29.99)
- 📷 Webcam HD 1080p ($59.99)
- 📱 Phone Stand Holder ($14.99)
- 🔊 Bluetooth Speaker ($44.99)
- 🎮 Gaming Mouse Pad ($19.99)
- 🎧 Wireless Earbuds ($69.99)
- 💨 Laptop Cooling Pad ($34.99)
- 🔌 HDMI Cable 4K ($12.99)
- 📝 Desk Organizer ($27.99)

### Step 3: Start your application
```bash
# Terminal 1 - Backend
cd I:\Collection\Desktop\E-commerce\backend
npm run dev

# Terminal 2 - Frontend
cd I:\Collection\Desktop\E-commerce\frontend
npm run dev
```

### Step 4: View products
Open http://localhost:3000 and you'll see all the products!

---

## 🎨 Method 1: Using Admin Dashboard (UI)

### Step 1: Create an Admin Account

**Option A: Using PowerShell**
```powershell
$body = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/signup" -Method Post -Body $body -ContentType "application/json"
```

**Option B: Using curl (if available)**
```bash
curl -X POST http://localhost:5000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\": \"Admin User\", \"email\": \"admin@example.com\", \"password\": \"admin123\", \"role\": \"admin\"}"
```

### Step 2: Login to Admin Dashboard
1. Go to http://localhost:3000
2. Click "Login"
3. Enter:
   - Email: `admin@example.com`
   - Password: `admin123`

### Step 3: Add Products
1. Navigate to Admin Dashboard
2. Click "Add Product" or "Manage Products"
3. Fill in the product details:
   - **Name**: Product name
   - **Description**: Detailed description
   - **Price**: Product price (e.g., 99.99)
   - **Category**: Electronics, Clothing, Books, etc.
   - **Stock**: Available quantity
   - **Image**: Image URL (use Unsplash for free images)
4. Click "Create Product"

---

## 🔧 Method 2: Using API Directly (Postman/Thunder Client)

### Step 1: Get Admin Token

**Request:**
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

Copy the token from the response.

### Step 2: Create Product

**Request:**
```
POST http://localhost:5000/api/products
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation",
  "price": 79.99,
  "category": "Electronics",
  "stock": 50,
  "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
}
```

### Step 3: Verify Product Created

**Request:**
```
GET http://localhost:5000/api/products
```

---

## 💻 Method 3: Using PowerShell Script

Create a file `add-product.ps1`:

```powershell
# Login as admin
$loginBody = @{
    email = "admin@example.com"
    password = "admin123"
} | ConvertTo-Json

$loginResponse = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method Post -Body $loginBody -ContentType "application/json"
$token = $loginResponse.data.token

# Add product
$productBody = @{
    name = "Wireless Headphones"
    description = "High-quality wireless headphones with noise cancellation"
    price = 79.99
    category = "Electronics"
    stock = 50
    image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

$product = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method Post -Body $productBody -Headers $headers

Write-Host "✅ Product created successfully!"
Write-Host "Product ID: $($product.data._id)"
Write-Host "Product Name: $($product.data.name)"
```

Run it:
```powershell
.\add-product.ps1
```

---

## 🖼️ Finding Product Images

### Free Image Sources:
1. **Unsplash** (https://unsplash.com)
   - Search for product type
   - Right-click image → Copy image address
   - Use URL like: `https://images.unsplash.com/photo-xxxxx?w=500`

2. **Pexels** (https://pexels.com)
   - Free stock photos
   - Similar to Unsplash

3. **Placeholder Images** (for testing)
   - `https://via.placeholder.com/500x500?text=Product+Name`

---

## 📋 Product Schema Reference

When adding products, ensure you include all required fields:

```javascript
{
  "name": "String (required)",           // Product name
  "description": "String (required)",    // Detailed description
  "price": 99.99,                        // Number (required, min: 0)
  "category": "String (required)",       // Category name
  "stock": 50,                           // Number (required, min: 0)
  "image": "String (optional)"           // Image URL
}
```

### Valid Categories:
- Electronics
- Clothing
- Books
- Home & Garden
- Sports
- Toys
- Beauty
- Food
- Accessories
- Other

---

## 🔍 Verifying Products

### Check in Browser:
1. Go to http://localhost:3000
2. Products should appear on the home page

### Check via API:
```bash
# Get all products
GET http://localhost:5000/api/products

# Get single product
GET http://localhost:5000/api/products/:productId

# Search products
GET http://localhost:5000/api/products?search=headphones

# Filter by category
GET http://localhost:5000/api/products?category=Electronics
```

---

## 🛠️ Troubleshooting

### "Unauthorized" Error
- Make sure you're logged in as admin
- Check that the Authorization header includes the token
- Verify token hasn't expired (7-day expiry)

### "Validation Error"
- Ensure all required fields are provided
- Check that price and stock are positive numbers
- Verify category is a valid string

### Products Not Showing
- Check MongoDB connection
- Verify products were created (check database)
- Clear browser cache
- Check console for errors

### Image Not Loading
- Verify image URL is accessible
- Use HTTPS URLs (not HTTP)
- Try a different image source
- Use placeholder images for testing

---

## 📊 Managing Products

### Update Product:
```
PUT http://localhost:5000/api/products/:productId
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Updated Product Name",
  "price": 89.99,
  "stock": 100
}
```

### Delete Product:
```
DELETE http://localhost:5000/api/products/:productId
Authorization: Bearer YOUR_TOKEN
```

### Get Product by ID:
```
GET http://localhost:5000/api/products/:productId
```

---

## 🎯 Quick Commands Summary

```bash
# Seed sample products (easiest method)
cd I:\Collection\Desktop\E-commerce\backend
npm run seed

# Start backend
npm run dev

# Start frontend (new terminal)
cd I:\Collection\Desktop\E-commerce\frontend
npm run dev

# Run tests
cd I:\Collection\Desktop\E-commerce\backend
npm test
```

---

## 📚 Additional Resources

- **API Documentation**: `backend/README.md`
- **Testing Guide**: `TESTING_DOCUMENTATION.md`
- **Setup Guide**: `SETUP_GUIDE.md`
- **Deployment Guide**: `DEPLOYMENT.md`

---

**Need Help?** Check the main README.md or the troubleshooting section above.

**Happy Selling! 🎉**