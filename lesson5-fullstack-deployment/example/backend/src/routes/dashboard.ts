import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getDashboard,
  updateLayout,
  addWidget,
  removeWidget,
} from '../controllers/dashboardController.js';

const router = express.Router();

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
router.get('/', protect, getDashboard);

// @desc    Update dashboard layout
// @route   PUT /api/dashboard/layout
// @access  Private
router.put('/layout', protect, updateLayout);

// @desc    Add widget to dashboard
// @route   POST /api/dashboard/widgets
// @access  Private
router.post('/widgets', protect, addWidget);

// @desc    Remove widget from dashboard
// @route   DELETE /api/dashboard/widgets/:widgetId
// @access  Private
router.delete('/widgets/:widgetId', protect, removeWidget);

export default router;