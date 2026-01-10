const express = require('express');
const dotenv = require('dotenv');
const cors = require(`cors`);
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(express.json()); // Allow sending JSON data in body
app.use(cookieParser()); // Allow parsing cookies
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logger
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend
  credentials: true,               // Allow cookies to be sent
}));
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


app.get('/', (req,res) => {
    res,send('API is running .......');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});