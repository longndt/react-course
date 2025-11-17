import User from '../models/User.js';
import Product from '../models/Product.js';

// @desc    Get dashboard data
// @route   GET /api/dashboard
// @access  Private
export const getDashboard = async (req, res) => {
    try {
        // Total users
        const totalUsers = await User.countDocuments();

        // Total products
        const totalProducts = await Product.countDocuments();

        // Recent activity (last 10 products and users)
        const recentProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name createdAt')
            .lean();

        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name createdAt')
            .lean();

        const recentActivity = [
            ...recentProducts.map(product => ({
                type: 'product_added',
                description: `Product "${product.name}" was added`,
                timestamp: product.createdAt
            })),
            ...recentUsers.map(user => ({
                type: 'user_registration',
                description: `User "${user.name}" registered`,
                timestamp: user.createdAt
            }))
        ]
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
            .slice(0, 10);

        res.json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                recentActivity
            }
        });
    } catch (error) {
        console.error('Get dashboard error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
