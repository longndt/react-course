import { Request, Response } from 'express';
import Dashboard from '../models/Dashboard';

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboard = async (req: Request, res: Response) => {
    try {
        const userId = (req.user as any)?._id;

        // Get or create dashboard for user
        let dashboard = await Dashboard.findOne({ userId });

        if (!dashboard) {
            // Create default dashboard
            dashboard = await Dashboard.create({
                userId,
                totalUsers: 0,
                totalRevenue: 0,
                totalOrders: 0,
                monthlyGrowth: 0,
                topProducts: [],
                recentActivity: []
            });
        }

        res.json({
            success: true,
            data: {
                dashboard: {
                    id: dashboard._id,
                    userId: dashboard.userId,
                    totalUsers: dashboard.totalUsers,
                    totalRevenue: dashboard.totalRevenue,
                    totalOrders: dashboard.totalOrders,
                    monthlyGrowth: dashboard.monthlyGrowth,
                    topProducts: dashboard.topProducts,
                    recentActivity: dashboard.recentActivity,
                },
            },
        });
    } catch (error: any) {
        console.error('Get dashboard error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// @desc    Update dashboard data
// @route   PUT /api/dashboard/data
// @access  Private
export const updateDashboardData = async (req: Request, res: Response) => {
    try {
        const { totalUsers, totalRevenue, totalOrders, monthlyGrowth } = req.body;
        const userId = (req.user as any)?._id;

        const dashboard = await Dashboard.findOneAndUpdate(
            { userId },
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
                dashboard: {
                    id: dashboard._id,
                    userId: dashboard.userId,
                    totalUsers: dashboard.totalUsers,
                    totalRevenue: dashboard.totalRevenue,
                    totalOrders: dashboard.totalOrders,
                    monthlyGrowth: dashboard.monthlyGrowth,
                    topProducts: dashboard.topProducts,
                    recentActivity: dashboard.recentActivity,
                },
            },
        });
    } catch (error: any) {
        console.error('Update dashboard data error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};