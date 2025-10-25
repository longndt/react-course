import express from 'express';
import { protect } from '../middleware/auth.js';
import { uploadConfig } from '../config/upload.js';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats
} from '../controllers/productController.js';

const router = express.Router();

// Statistics route (must be before :id route)
router.get('/stats/overview', protect, getProductStats);

// CRUD routes
router.get('/', protect, getProducts);
router.get('/:id', protect, getProduct);
router.post('/', protect, uploadConfig.single('image'), createProduct);
router.put('/:id', protect, uploadConfig.single('image'), updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;

