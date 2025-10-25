import Product from '../models/Product.js';

/**
 * Get all products with search, filter, sort
 * @route GET /api/products
 * @access Private
 */
export const getProducts = async (req, res) => {
    try {
        const { search, category, sortBy = 'createdAt', order = 'desc', page = 1, limit = 10 } = req.query;

        // Build query
        const query = {};

        // Search by name or description
        if (search) {
            query.$text = { $search: search };
        }

        // Filter by category
        if (category && category !== 'all') {
            query.category = category;
        }

        // Sort options
        const sortOptions = {};
        sortOptions[sortBy] = order === 'asc' ? 1 : -1;

        // Pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Execute query
        const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum)
            .populate('userId', 'name email');

        // Get total count
        const total = await Product.countDocuments(query);

        res.json({
            success: true,
            data: {
                products,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    pages: Math.ceil(total / limitNum)
                }
            }
        });
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

/**
 * Get single product
 * @route GET /api/products/:id
 * @access Private
 */
export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('userId', 'name email');

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Get product error:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};

/**
 * Create product
 * @route POST /api/products
 * @access Private
 */
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const userId = req.user?._id;

        // Handle image upload
        let image = '';
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            stock,
            image,
            userId
        });

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            data: product
        });
    } catch (error) {
        console.error('Create product error:', error);
        res.status(400).json({ error: error.message || 'Failed to create product' });
    }
};

/**
 * Update product
 * @route PUT /api/products/:id
 * @access Private
 */
export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update fields
        if (name) product.name = name;
        if (description) product.description = description;
        if (price !== undefined) product.price = price;
        if (category) product.category = category;
        if (stock !== undefined) product.stock = stock;

        // Handle image upload
        if (req.file) {
            product.image = `/uploads/${req.file.filename}`;
        }

        await product.save();

        res.json({
            success: true,
            message: 'Product updated successfully',
            data: product
        });
    } catch (error) {
        console.error('Update product error:', error);
        res.status(400).json({ error: error.message || 'Failed to update product' });
    }
};

/**
 * Delete product
 * @route DELETE /api/products/:id
 * @access Private
 */
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await product.deleteOne();

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

/**
 * Get product statistics
 * @route GET /api/products/stats/overview
 * @access Private
 */
export const getProductStats = async (req, res) => {
    try {
        // Total products
        const totalProducts = await Product.countDocuments();

        // Total value
        const valueResult = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
                }
            }
        ]);
        const totalValue = valueResult[0]?.totalValue || 0;

        // Low stock products
        const lowStockCount = await Product.countDocuments({ stock: { $lte: 10 } });

        // Products by category
        const categoryStats = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        // Top products by value
        const topProducts = await Product.find()
            .sort({ price: -1 })
            .limit(5)
            .select('name price stock');

        res.json({
            success: true,
            data: {
                totalProducts,
                totalValue: Math.round(totalValue),
                lowStockCount,
                categoryStats,
                topProducts
            }
        });
    } catch (error) {
        console.error('Get product stats error:', error);
        res.status(500).json({ error: 'Failed to fetch statistics' });
    }
};

