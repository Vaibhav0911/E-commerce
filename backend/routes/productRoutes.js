const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { productValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes (Admin only)
router.post(
  '/',
  protect,
  authorize('admin'),
  productValidation,
  validate,
  createProduct
);
router.put(
  '/:id',
  protect,
  authorize('admin'),
  productValidation,
  validate,
  updateProduct
);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;