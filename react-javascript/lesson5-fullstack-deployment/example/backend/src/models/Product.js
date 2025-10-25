import mongoose from 'mongoose';

/**
 * @typedef {Object} IProduct
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {number} price - Product price
 * @property {string} category - Product category
 * @property {number} stock - Stock quantity
 * @property {string} image - Image URL
 * @property {mongoose.Types.ObjectId} userId - User who created the product
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Update date
 */

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
        maxlength: [100, 'Name cannot be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys', 'Other']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    image: {
        type: String,
        default: ''
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Indexes for better query performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ userId: 1 });
productSchema.index({ createdAt: -1 });

export default mongoose.model('Product', productSchema);

