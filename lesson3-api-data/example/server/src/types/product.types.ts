import { Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    category: 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'other';
    inStock: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type ProductCategory = 'electronics' | 'clothing' | 'books' | 'home' | 'sports' | 'other';

