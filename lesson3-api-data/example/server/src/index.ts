import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/products';
import Product from './models/Product';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
   console.error(err.stack);
   res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/react-lesson3')
   .then(async () => {
      console.log('Connected to MongoDB');

      // Seed some sample products if none exist
      const productCount = await Product.countDocuments();

      if (productCount === 0) {
         console.log('Seeding sample products...');
         const sampleProducts = [
            {
               name: 'iPhone 15 Pro',
               description: 'Latest iPhone with advanced camera system and A17 Pro chip',
               price: 999.99,
               category: 'electronics' as const,
               inStock: true
            },
            {
               name: 'MacBook Air M2',
               description: 'Ultra-thin laptop with M2 chip and all-day battery life',
               price: 1199.99,
               category: 'electronics' as const,
               inStock: true
            },
            {
               name: 'Nike Air Max 270',
               description: 'Comfortable and stylish athletic shoes',
               price: 150.00,
               category: 'sports' as const,
               inStock: false
            }
         ];

         await Product.insertMany(sampleProducts);
         console.log('Sample products seeded successfully');
      }

      app.listen(PORT, () => {
         console.log(`Server running on port ${PORT}`);
         console.log(`Products API available at http://localhost:${PORT}/api/products`);
      });
   })
   .catch((error: Error) => {
      console.error('MongoDB connection error:', error);
   });

export default app;

