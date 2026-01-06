const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/product');
const User = require('./models/user');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear existing data to avoid duplicates
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed...');

    // 2. Create a Sample Admin User with a real password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    const createdUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    const adminUser = createdUser._id;

    // 3. Create Sample Products
    const sampleProducts = [
      {
        user: adminUser,
        name: 'Airpods Wireless Bluetooth Headphones',
        image: 'https://images.unsplash.com/photo-1572569028738-411a56103324?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Bluetooth technology lets you connect it with compatible devices wirelessly.',
        brand: 'Apple',
        category: 'Electronics',
        price: 89.99,
        countInStock: 10,
      },
      {
        user: adminUser,
        name: 'iPhone 13 Pro 256GB Memory',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity.',
        brand: 'Apple',
        category: 'Electronics',
        price: 599.99,
        countInStock: 7,
      },
      {
        user: adminUser,
        name: 'Sony Playstation 5',
        image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'The ultimate home entertainment center starts with PlayStation.',
        brand: 'Sony',
        category: 'Electronics',
        price: 399.99,
        countInStock: 11,
      },
      {
        user: adminUser,
        name: 'Cannon EOS 80D DSLR Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        description: 'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems.',
        brand: 'Cannon',
        category: 'Electronics',
        price: 929.99,
        countInStock: 5,
      },
    ];

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();