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

        // Total inventory value
        const inventoryResult = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
                }
            }
        ]);
        const totalRevenue = inventoryResult[0]?.totalValue || 0;

        // Calculate monthly growth (mock for now, need order history for real calculation)
        const monthlyGrowth = 12.5;

        // Top products by value
        const topProducts = await Product.aggregate([
            {
                $project: {
                    name: 1,
                    price: 1,
                    stock: 1,
                    totalValue: { $multiply: ['$price', '$stock'] }
                }
            },
            { $sort: { totalValue: -1 } },
            { $limit: 5 },
            {
                $project: {
                    name: 1,
                    sales: '$stock',
                    revenue: '$totalValue'
                }
            }
        ]);

        // Recent activity (last 10 products)
        const recentProducts = await Product.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('name createdAt');

        const recentActivity = recentProducts.map(product => ({
            type: 'product_added',
            description: `Product "${product.name}" was added`,
            timestamp: product.createdAt
        }));

        res.json({
            success: true,
            data: {
                totalUsers,
                totalProducts,
                totalRevenue: Math.round(totalRevenue),
                monthlyGrowth,
                topProducts,
                recentActivity
            }
        });
    } catch (error) {
        console.error('Get dashboard error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
