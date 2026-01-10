const Product = require('../models/product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  // 1. Check if there is a 'keyword' query (e.g., ?keyword=iphone)
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, // MongoDB Regex (partial matching)
          $options: 'i',             // Case insensitive (iPhone = iphone)
        },
      }
    : {};

  // 2. Find products that match the keyword (or all if empty)
  const products = await Product.find({ ...keyword });
  
  res.json(products);
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = new Product({
      name,
      price,
      user: req.user._id, // Comes from the 'protect' middleware
      image, 
      brand,
      category,
      countInStock,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);

    if(product){
      res.json(product);
    }else{
      res.status(404).json({ message: 'Product not found' });
    }
  }catch(error){
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  getProducts,
  createProduct,
  getProductById,
};