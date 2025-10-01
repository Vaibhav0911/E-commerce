# 🧪 Complete Testing Guide

This guide walks you through testing the entire E-Commerce application from user signup to order completion.

## Prerequisites

- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ MongoDB running and connected

## Test Scenario 1: User Registration & Authentication

### 1.1 Sign Up New User

1. Navigate to http://localhost:3000
2. Click "Sign Up" button in navbar
3. Fill in the form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm Password: `password123`
4. Click "Sign Up"

**Expected Result:**
- ✅ Redirected to home page
- ✅ Navbar shows user name "Test User"
- ✅ Cart icon visible
- ✅ "Orders" and "Logout" options visible

### 1.2 Logout

1. Click "Logout" in navbar

**Expected Result:**
- ✅ Redirected to home page
- ✅ Navbar shows "Login" and "Sign Up" buttons
- ✅ Cart icon hidden

### 1.3 Login

1. Click "Login" in navbar
2. Enter credentials:
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Login"

**Expected Result:**
- ✅ Redirected to home page
- ✅ User logged in successfully
- ✅ Navbar shows user name

## Test Scenario 2: Admin User & Product Management

### 2.1 Create Admin User

Open terminal and run:

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"admin123\",\"role\":\"admin\"}"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGc...",
    "user": {
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  }
}
```

### 2.2 Login as Admin

1. Logout if logged in
2. Click "Login"
3. Enter admin credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
4. Click "Login"

**Expected Result:**
- ✅ Logged in successfully
- ✅ "Admin" link visible in navbar

### 2.3 Access Admin Dashboard

1. Click "Admin" in navbar

**Expected Result:**
- ✅ Redirected to `/admin`
- ✅ Dashboard shows statistics cards:
  - Total Products: 0
  - Total Orders: 0
  - Total Revenue: $0.00
  - Pending Orders: 0
- ✅ Quick action cards visible

### 2.4 Add Products

1. Click "Manage Products" or navigate to `/admin/products`
2. Click "Add Product" button
3. Fill in product details:

**Product 1: Laptop**
- Name: `Gaming Laptop`
- Description: `High-performance gaming laptop with RTX 4080`
- Price: `1999.99`
- Stock: `25`
- Category: `electronics`
- Image: `https://via.placeholder.com/400x300?text=Gaming+Laptop`

4. Click "Add Product"

**Expected Result:**
- ✅ Modal closes
- ✅ Product appears in table
- ✅ Success feedback

Repeat for more products:

**Product 2: Smartphone**
- Name: `Smartphone Pro`
- Description: `Latest flagship smartphone with 5G`
- Price: `899.99`
- Stock: `50`
- Category: `electronics`
- Image: `https://via.placeholder.com/400x300?text=Smartphone`

**Product 3: Headphones**
- Name: `Wireless Headphones`
- Description: `Noise-cancelling wireless headphones`
- Price: `299.99`
- Stock: `100`
- Category: `electronics`
- Image: `https://via.placeholder.com/400x300?text=Headphones`

**Product 4: T-Shirt**
- Name: `Cotton T-Shirt`
- Description: `Comfortable cotton t-shirt`
- Price: `29.99`
- Stock: `200`
- Category: `clothing`
- Image: `https://via.placeholder.com/400x300?text=T-Shirt`

### 2.5 Edit Product

1. Click edit icon (pencil) on any product
2. Change price to `1899.99`
3. Click "Update Product"

**Expected Result:**
- ✅ Product updated in table
- ✅ New price displayed

### 2.6 View Products on Home Page

1. Click "Products" in navbar or navigate to `/`

**Expected Result:**
- ✅ All 4 products displayed in grid
- ✅ Product cards show image, name, description, price, stock
- ✅ Category badges visible

## Test Scenario 3: Shopping & Cart Management

### 3.1 Browse Products

1. Navigate to home page `/`
2. Test search: Type "laptop" in search box

**Expected Result:**
- ✅ Only laptop product shown
- ✅ Other products filtered out

3. Clear search
4. Test category filter: Select "electronics"

**Expected Result:**
- ✅ Only electronics products shown
- ✅ Clothing products hidden

5. Reset filter to "All Categories"

### 3.2 View Product Details

1. Click on "Gaming Laptop" product card

**Expected Result:**
- ✅ Redirected to `/products/:id`
- ✅ Large product image displayed
- ✅ Full description visible
- ✅ Price and stock shown
- ✅ Quantity selector visible
- ✅ "Add to Cart" button visible

### 3.3 Add to Cart from Product Details

1. On product details page
2. Change quantity to `2`
3. Click "Add to Cart"

**Expected Result:**
- ✅ Success message: "Added to cart successfully!"
- ✅ Cart badge in navbar shows `2`

4. Click "Back to Products"

### 3.4 Add to Cart from Home Page

1. On home page
2. Click "Add to Cart" on "Smartphone Pro"

**Expected Result:**
- ✅ Success message: "Added to cart!"
- ✅ Cart badge shows `3` (2 laptops + 1 smartphone)

3. Click "Add to Cart" on "Wireless Headphones"

**Expected Result:**
- ✅ Cart badge shows `4`

### 3.5 View Cart

1. Click cart icon in navbar

**Expected Result:**
- ✅ Redirected to `/cart`
- ✅ Three items displayed:
  - Gaming Laptop (Qty: 2) - $3,999.98
  - Smartphone Pro (Qty: 1) - $899.99
  - Wireless Headphones (Qty: 1) - $299.99
- ✅ Order summary shows:
  - Subtotal: $5,199.96
  - Shipping: Free
  - Total: $5,199.96

### 3.6 Update Cart Quantity

1. Click `+` button on Smartphone Pro

**Expected Result:**
- ✅ Quantity changes to `2`
- ✅ Item total updates to $1,799.98
- ✅ Order total updates to $6,099.95
- ✅ Cart badge shows `5`

2. Click `-` button on Gaming Laptop

**Expected Result:**
- ✅ Quantity changes to `1`
- ✅ Item total updates to $1,999.99
- ✅ Order total updates to $4,099.96
- ✅ Cart badge shows `4`

### 3.7 Remove from Cart

1. Click trash icon on Wireless Headphones
2. Confirm removal

**Expected Result:**
- ✅ Item removed from cart
- ✅ Cart shows 2 items
- ✅ Order total updates to $3,799.97
- ✅ Cart badge shows `3`

## Test Scenario 4: Checkout & Order Placement

### 4.1 Proceed to Checkout

1. In cart page, click "Proceed to Checkout"

**Expected Result:**
- ✅ Redirected to `/checkout`
- ✅ Shipping form displayed
- ✅ Order summary shows cart items
- ✅ Total: $3,799.97

### 4.2 Fill Shipping Information

Fill in the form:
- Street Address: `123 Main Street`
- City: `New York`
- State: `NY`
- ZIP Code: `10001`
- Country: `USA`
- Payment Method: `Credit Card`

### 4.3 Place Order

1. Click "Place Order"

**Expected Result:**
- ✅ Order processing
- ✅ Redirected to `/orders`
- ✅ Success message: "Order placed successfully!"
- ✅ Cart badge shows `0` (cart cleared)

### 4.4 View Order Details

**Expected Result:**
- ✅ Order displayed with:
  - Order ID
  - Date
  - Status: "Pending"
  - Total: $3,799.97
  - Items list
  - Shipping address
- ✅ "Cancel Order" button visible

## Test Scenario 5: Order Management

### 5.1 View User Orders

1. Click "Orders" in navbar

**Expected Result:**
- ✅ All user orders displayed
- ✅ Order status badges colored correctly
- ✅ Order details expandable

### 5.2 Cancel Order (User)

1. Click "Cancel Order" on pending order
2. Confirm cancellation

**Expected Result:**
- ✅ Order status changes to "Cancelled"
- ✅ "Cancel Order" button disappears
- ✅ Product stock restored

### 5.3 Admin Order Management

1. Login as admin
2. Navigate to `/admin/orders`

**Expected Result:**
- ✅ All orders from all users displayed
- ✅ Table shows: Order ID, Customer, Date, Total, Status
- ✅ "View" button on each order

3. Click "View" on any order

**Expected Result:**
- ✅ Modal opens with full order details
- ✅ Customer information visible
- ✅ Order items listed
- ✅ Shipping address shown
- ✅ Status dropdown visible

4. Change status to "Processing"

**Expected Result:**
- ✅ Status updated immediately
- ✅ Status badge color changes

5. Change status to "Shipped"
6. Change status to "Delivered"

**Expected Result:**
- ✅ Each status change reflected immediately
- ✅ User can see updated status in their orders

## Test Scenario 6: Protected Routes

### 6.1 Test Cart Protection

1. Logout
2. Try to access `/cart` directly

**Expected Result:**
- ✅ Redirected to `/login`
- ✅ Cannot access cart without login

### 6.2 Test Checkout Protection

1. While logged out, try to access `/checkout`

**Expected Result:**
- ✅ Redirected to `/login`

### 6.3 Test Admin Protection

1. Login as regular user (not admin)
2. Try to access `/admin`

**Expected Result:**
- ✅ Redirected to home page `/`
- ✅ Cannot access admin routes

3. Try to access `/admin/products`

**Expected Result:**
- ✅ Redirected to home page

## Test Scenario 7: Error Handling

### 7.1 Invalid Login

1. Go to login page
2. Enter wrong credentials:
   - Email: `wrong@example.com`
   - Password: `wrongpass`
3. Click "Login"

**Expected Result:**
- ✅ Error message displayed
- ✅ Not logged in

### 7.2 Duplicate Email Signup

1. Try to signup with existing email
2. Use email: `test@example.com`

**Expected Result:**
- ✅ Error message: "Email already exists"
- ✅ Not registered

### 7.3 Add Out of Stock Product

1. As admin, set a product stock to `0`
2. As user, try to add it to cart

**Expected Result:**
- ✅ "Add to Cart" button disabled
- ✅ Shows "Out of stock"

### 7.4 Checkout with Empty Cart

1. Clear cart
2. Try to access `/checkout`

**Expected Result:**
- ✅ Message: "Your cart is empty"
- ✅ Button to continue shopping

## Test Scenario 8: Search & Filter

### 8.1 Search Products

1. Go to home page
2. Search for "phone"

**Expected Result:**
- ✅ Shows Smartphone Pro
- ✅ Hides other products

3. Search for "wireless"

**Expected Result:**
- ✅ Shows Wireless Headphones

### 8.2 Category Filter

1. Select "clothing" category

**Expected Result:**
- ✅ Shows only T-Shirt
- ✅ Hides electronics

2. Select "electronics"

**Expected Result:**
- ✅ Shows laptop, smartphone, headphones
- ✅ Hides clothing

## Test Scenario 9: Responsive Design

### 9.1 Mobile View

1. Open browser DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android device

**Expected Result:**
- ✅ Navbar collapses appropriately
- ✅ Product grid adjusts to single column
- ✅ Forms are mobile-friendly
- ✅ Buttons are touch-friendly
- ✅ All features work on mobile

### 9.2 Tablet View

1. Select iPad or tablet device

**Expected Result:**
- ✅ Product grid shows 2 columns
- ✅ Layout adjusts appropriately

## Test Scenario 10: Performance & UX

### 10.1 Loading States

1. Observe loading spinners when:
   - Fetching products
   - Adding to cart
   - Placing order
   - Loading orders

**Expected Result:**
- ✅ Loading indicators shown
- ✅ Smooth transitions

### 10.2 Success Feedback

1. Verify success messages for:
   - Login/Signup
   - Add to cart
   - Order placed
   - Product created/updated

**Expected Result:**
- ✅ Clear success messages
- ✅ Auto-dismiss after few seconds

### 10.3 Error Feedback

1. Verify error messages for:
   - Invalid login
   - Network errors
   - Validation errors

**Expected Result:**
- ✅ Clear error messages
- ✅ Red color for errors

## ✅ Testing Checklist

Use this checklist to ensure all features work:

### Authentication
- [ ] User signup
- [ ] User login
- [ ] User logout
- [ ] Admin login
- [ ] Protected routes redirect
- [ ] Token persistence

### Products
- [ ] View all products
- [ ] View product details
- [ ] Search products
- [ ] Filter by category
- [ ] Admin create product
- [ ] Admin edit product
- [ ] Admin delete product

### Cart
- [ ] Add to cart
- [ ] Update quantity
- [ ] Remove from cart
- [ ] Clear cart
- [ ] Cart badge updates
- [ ] Cart total calculation

### Orders
- [ ] Place order
- [ ] View orders
- [ ] Cancel order
- [ ] Admin view all orders
- [ ] Admin update status
- [ ] Stock management

### UI/UX
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Success feedback
- [ ] Navigation
- [ ] Forms validation

## 🐛 Common Issues & Solutions

### Issue: Cart not updating
**Solution**: Ensure you're logged in and backend is running

### Issue: Products not showing
**Solution**: Add products via admin panel first

### Issue: Can't access admin
**Solution**: Ensure user has admin role

### Issue: Order placement fails
**Solution**: Check cart has items and all form fields are filled

## 📊 Test Results Template

```
Test Date: ___________
Tester: ___________

Scenario 1: User Registration ✅ / ❌
Scenario 2: Admin & Products ✅ / ❌
Scenario 3: Shopping & Cart ✅ / ❌
Scenario 4: Checkout & Orders ✅ / ❌
Scenario 5: Order Management ✅ / ❌
Scenario 6: Protected Routes ✅ / ❌
Scenario 7: Error Handling ✅ / ❌
Scenario 8: Search & Filter ✅ / ❌
Scenario 9: Responsive Design ✅ / ❌
Scenario 10: Performance & UX ✅ / ❌

Overall Status: ✅ PASS / ❌ FAIL

Notes:
_________________________________
_________________________________
```

---

**Happy Testing! 🧪**