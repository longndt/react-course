import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getDashboard,
  updateDashboardData,
} from '../controllers/dashboardController.js';

const router = express.Router();

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
router.get('/', protect, getDashboard);

// @desc    Update dashboard data
// @route   PUT /api/dashboard/data
// @access  Private
router.put('/data', protect, updateDashboardData);

export default router;