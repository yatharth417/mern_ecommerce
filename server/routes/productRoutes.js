const express = require('express');
const router = express.Router();
const { getProducts, createProduct, getProductById, getMyProducts } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

// Route for '/' (e.g., /api/products)
router.route('/')
  .get(getProducts)               // Anyone can see products
  .post(protect, admin, createProduct); // Only Logged-in Admins can create


router.route('/myproducts').get(protect, admin, getMyProducts);

router.route('/:id').get(getProductById);

module.exports = router;