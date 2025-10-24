import express from 'express';
import Dashboard from '../models/Dashboard.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let dashboard = await Dashboard.findOne({ userId: req.user._id });

    // If no dashboard exists, create one with sample data
    if (!dashboard) {
      dashboard = await Dashboard.create({
        userId: req.user._id,
        totalUsers: Math.floor(Math.random() * 1000) + 1000,
        totalRevenue: Math.floor(Math.random() * 100000) + 50000,
        totalOrders: Math.floor(Math.random() * 500) + 500,
        monthlyGrowth: Math.floor(Math.random() * 50) + 10,
        topProducts: [
          { name: 'Product A', sales: 150, revenue: 15000 },
          { name: 'Product B', sales: 120, revenue: 12000 },
          { name: 'Product C', sales: 100, revenue: 10000 },
          { name: 'Product D', sales: 80, revenue: 8000 },
          { name: 'Product E', sales: 60, revenue: 6000 }
        ],
        recentActivity: [
          {
            type: 'user_registration',
            description: 'New user registered',
            timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
          },
          {
            type: 'order_placed',
            description: 'Order #1234 was placed',
            timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
          },
          {
            type: 'payment_received',
            description: 'Payment of $299 received',
            timestamp: new Date(Date.now() - 1000 * 60 * 90) // 1.5 hours ago
          },
          {
            type: 'product_added',
            description: 'New product "Widget X" added',
            timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
          },
          {
            type: 'system_update',
            description: 'System maintenance completed',
            timestamp: new Date(Date.now() - 1000 * 60 * 180) // 3 hours ago
          }
        ]
      });
    }

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers: dashboard.totalUsers,
          totalRevenue: dashboard.totalRevenue,
          totalOrders: dashboard.totalOrders,
          monthlyGrowth: dashboard.monthlyGrowth
        },
        topProducts: dashboard.topProducts,
        recentActivity: dashboard.recentActivity
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting dashboard data'
    });
  }
});

// @desc    Update dashboard data
// @route   PUT /api/dashboard
// @access  Private
router.put('/', protect, async (req, res) => {
  try {
    const { totalUsers, totalRevenue, totalOrders, monthlyGrowth } = req.body;

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.user._id },
      {
        totalUsers: totalUsers || 0,
        totalRevenue: totalRevenue || 0,
        totalOrders: totalOrders || 0,
        monthlyGrowth: monthlyGrowth || 0
      },
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers: dashboard.totalUsers,
          totalRevenue: dashboard.totalRevenue,
          totalOrders: dashboard.totalOrders,
          monthlyGrowth: dashboard.monthlyGrowth
        }
      }
    });
  } catch (error) {
    console.error('Update dashboard error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error updating dashboard data'
    });
  }
});

// @desc    Add recent activity
// @route   POST /api/dashboard/activity
// @access  Private
router.post('/activity', protect, async (req, res) => {
  try {
    const { type, description } = req.body;

    if (!type || !description) {
      return res.status(400).json({
        success: false,
        error: 'Type and description are required'
      });
    }

    const validTypes = ['user_registration', 'order_placed', 'payment_received', 'product_added', 'system_update'];
    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid activity type'
      });
    }

    const activity = {
      type,
      description,
      timestamp: new Date()
    };

    const dashboard = await Dashboard.findOneAndUpdate(
      { userId: req.user._id },
      { $push: { recentActivity: { $each: [activity], $slice: -10 } } }, // Keep only last 10 activities
      { new: true, upsert: true }
    );

    res.json({
      success: true,
      data: {
        activity,
        recentActivity: dashboard.recentActivity
      }
    });
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error adding activity'
    });
  }
});

// @desc    Get dashboard analytics
// @route   GET /api/dashboard/analytics
// @access  Private
router.get('/analytics', protect, async (req, res) => {
  try {
    const dashboard = await Dashboard.findOne({ userId: req.user._id });

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        error: 'Dashboard not found'
      });
    }

    // Calculate some basic analytics
    const revenuePerOrder = dashboard.totalOrders > 0 ? dashboard.totalRevenue / dashboard.totalOrders : 0;
    const averageOrderValue = Math.round(revenuePerOrder * 100) / 100;

    // Mock data for charts (in real app, this would come from actual data)
    const monthlyRevenue = [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 52000 },
      { month: 'Mar', revenue: 48000 },
      { month: 'Apr', revenue: 61000 },
      { month: 'May', revenue: 55000 },
      { month: 'Jun', revenue: 67000 }
    ];

    const userGrowth = [
      { month: 'Jan', users: 1200 },
      { month: 'Feb', users: 1350 },
      { month: 'Mar', users: 1280 },
      { month: 'Apr', users: 1450 },
      { month: 'May', users: 1380 },
      { month: 'Jun', users: 1520 }
    ];

    res.json({
      success: true,
      data: {
        analytics: {
          averageOrderValue,
          revenuePerOrder,
          monthlyGrowth: dashboard.monthlyGrowth
        },
        charts: {
          monthlyRevenue,
          userGrowth
        }
      }
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error getting analytics'
    });
  }
});

export default router;
