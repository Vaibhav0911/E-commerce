const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('../models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality.',
    price: 79.99,
    category: 'Electronics',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking, heart rate monitor, GPS, and smartphone notifications. Water-resistant up to 50m.',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500'
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable laptop backpack with USB charging port, water-resistant material, and multiple compartments.',
    price: 49.99,
    category: 'Accessories',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI, silent clicks, and long battery life.',
    price: 24.99,
    category: 'Electronics',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500'
  },
  {
    name: 'USB-C Hub Adapter',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and 100W power delivery.',
    price: 39.99,
    category: 'Electronics',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500'
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches, aluminum frame, and programmable keys.',
    price: 89.99,
    category: 'Electronics',
    stock: 40,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500'
  },
  {
    name: 'Portable Phone Charger',
    description: '20000mAh power bank with fast charging, dual USB ports, and LED display.',
    price: 29.99,
    category: 'Electronics',
    stock: 120,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'
  },
  {
    name: 'Webcam HD 1080p',
    description: 'Full HD webcam with auto-focus, built-in microphone, and wide-angle lens for video calls.',
    price: 59.99,
    category: 'Electronics',
    stock: 45,
    image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?w=500'
  },
  {
    name: 'Phone Stand Holder',
    description: 'Adjustable aluminum phone stand compatible with all smartphones and tablets.',
    price: 14.99,
    category: 'Accessories',
    stock: 150,
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500'
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof Bluetooth speaker with 360° sound, 12-hour battery, and deep bass.',
    price: 44.99,
    category: 'Electronics',
    stock: 65,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500'
  },
  {
    name: 'Gaming Mouse Pad',
    description: 'Extra large gaming mouse pad with non-slip rubber base and smooth surface.',
    price: 19.99,
    category: 'Accessories',
    stock: 90,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500'
  },
  {
    name: 'Wireless Earbuds',
    description: 'True wireless earbuds with active noise cancellation, touch controls, and charging case.',
    price: 69.99,
    category: 'Electronics',
    stock: 80,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500'
  },
  {
    name: 'Laptop Cooling Pad',
    description: 'Laptop cooling pad with 5 quiet fans, adjustable height, and dual USB ports.',
    price: 34.99,
    category: 'Accessories',
    stock: 55,
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500'
  },
  {
    name: 'HDMI Cable 4K',
    description: 'High-speed HDMI 2.1 cable supporting 4K@120Hz, 8K@60Hz, and HDR.',
    price: 12.99,
    category: 'Electronics',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
  },
  {
    name: 'Desk Organizer',
    description: 'Wooden desk organizer with multiple compartments for office supplies and accessories.',
    price: 27.99,
    category: 'Accessories',
    stock: 70,
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=500'
  }
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    console.log(process.env.MONGODB_URI);
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');

    // Clear existing products (optional - comment out if you want to keep existing products)
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`✅ Successfully added ${products.length} products!`);

    // Display added products
    console.log('\n📦 Products Added:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
    });

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

// Run the seeder
seedProducts();