import express from 'express';
import { protect } from '../middleware/auth.js';
import { getDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
router.get('/', protect, getDashboard);

export default router;
