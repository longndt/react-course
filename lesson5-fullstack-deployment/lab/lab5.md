# Lab 5 - Full-Stack Product Management System

## 📋 Overview

In this comprehensive lab, you'll build a **complete full-stack application** with React frontend and Express.js backend. You'll implement authentication, CRUD operations for products with image upload, and a real-time dashboard displaying data from MongoDB.

### What You'll Build

A complete Product Management System featuring:
- **User Authentication** - Register, login with JWT
- **Product CRUD** - Create, Read, Update, Delete products
- **Image Upload** - Upload product images
- **Search & Filter** - Find products by name, category
- **Sort & Pagination** - Organize product listings
- **Real Dashboard** - Display statistics from database
- **Clean UI** - Professional, responsive design

### Why This Matters

- **Full-Stack Skills** - Learn both frontend and backend development
- **Real-World Application** - Build production-ready features
- **Database Integration** - Work with MongoDB and Mongoose
- **File Handling** - Implement image upload functionality
- **Professional Development** - Follow industry best practices

---

## Learning Objectives

By the end of this lab, you will:

### Backend Development
- Set up Express.js server with proper structure
- Create RESTful API endpoints
- Implement JWT authentication
- Handle file uploads with Multer
- Design MongoDB schemas with Mongoose
- Write controllers following MVC pattern

### Frontend Development
- Build protected routes with authentication
- Create forms with validation and file upload
- Implement search, filter, and sort functionality
- Display data from API with loading states
- Handle errors gracefully
- Create a responsive dashboard

### Database & Integration
- Design database schemas
- Write efficient queries with indexes
- Aggregate data for statistics
- Handle relationships between models
- Implement pagination

---

## Pre-Lab Checklist

### Required Software
- [ ] **Node.js** (v18+) installed
- [ ] **MongoDB** installed locally or MongoDB Atlas account
- [ ] **VS Code** with recommended extensions
- [ ] **Postman** or similar API testing tool
- [ ] **Git** for version control

### Verification Commands
```bash
node --version    # Should show v18.0.0 or higher
npm --version     # Should show 9.0.0 or higher
mongo --version   # Or check MongoDB Atlas connection
```

### Required Knowledge
- [ ] React fundamentals (components, hooks, state)
- [ ] TypeScript basics
- [ ] REST API concepts
- [ ] Basic MongoDB knowledge
- [ ] Completion of Labs 1-4

---

## Project Setup

### Step 1: Create Project Structure

```bash
# Create main directory
mkdir lab5-fullstack
cd lab5-fullstack

# Create backend
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer express-rate-limit helmet
npm install -D nodemon typescript @types/node @types/express
npx tsc --init

# Create frontend
cd ..
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
npm install react-router-dom
```

### Step 2: Project Structure

```
lab5-fullstack/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Product.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   ├── productController.ts
│   │   │   └── dashboardController.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   └── dashboard.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── config/
│   │   │   └── upload.ts
│   │   └── server.ts
│   ├── uploads/
│   ├── .env
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── contexts/
    │   └── App.tsx
    └── package.json
```

---

## Exercises

---

### Exercise 1: Backend Setup & User Authentication (30%)

**Goal**: Set up Express.js backend with user authentication using JWT.

#### Task 1.1: Create User Model

Create `backend/src/models/User.ts`:

```typescript
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
```

#### Task 1.2: Create Auth Controller

Create `backend/src/controllers/authController.ts`:

```typescript
import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create user
    const user = await User.create({ name, email, password });
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      data: { user: { id: user._id, name, email }, token }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      data: { user: { id: user._id, name: user.name, email }, token }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

#### Task 1.3: Create Auth Middleware

Create `backend/src/middleware/auth.ts`:

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Not authorized' });
  }
};
```

**✅ Checkpoint 1**: Test authentication endpoints with Postman
- POST `/api/auth/register` - Create new user
- POST `/api/auth/login` - Login and get token

---

### Exercise 2: Product Model & CRUD Operations (40%)

**Goal**: Implement complete CRUD operations for products with image upload.

#### Task 2.1: Create Product Model

Create `backend/src/models/Product.ts`:

```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  userId: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 500
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Electronics', 'Clothing', 'Food', 'Books', 'Toys', 'Other']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: 0,
    default: 0
  },
  image: {
    type: String,
    default: ''
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Indexes for search and filter
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

export default mongoose.model<IProduct>('Product', productSchema);
```

#### Task 2.2: Configure File Upload

Create `backend/src/config/upload.ts`:

```typescript
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Invalid file type'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

export const uploadConfig = upload;
```

#### Task 2.3: Create Product Controller

Create `backend/src/controllers/productController.ts` with:
- `getProducts` - Get all products with search, filter, sort
- `getProduct` - Get single product by ID
- `createProduct` - Create new product with image
- `updateProduct` - Update product details
- `deleteProduct` - Delete product

**Challenge**: Implement search functionality using MongoDB text search.

**✅ Checkpoint 2**: Test all CRUD endpoints
- GET `/api/products` - List products with filters
- POST `/api/products` - Create product with image
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

---

### Exercise 3: Frontend - Authentication & Routing (30%)

**Goal**: Create frontend with authentication and protected routes.

#### Task 3.1: Create Auth Context

Create `frontend/src/contexts/AuthContext.tsx` with:
- Login function
- Register function
- Logout function
- Auth state management
- Token storage

#### Task 3.2: Create Login/Register Page

Create `frontend/src/pages/Login.tsx` with:
- Toggle between login/register
- Form validation
- Loading states
- Error handling
- Clean UI design

#### Task 3.3: Create Protected Routes

Update `frontend/src/App.tsx`:
- Public routes (login)
- Protected routes (dashboard, products)
- Redirect logic

**✅ Checkpoint 3**: Test authentication flow
- Register new user
- Login with credentials
- Access protected routes
- Logout functionality

---

### Exercise 4: Product Management UI (40%)

**Goal**: Build complete product management interface.

#### Task 4.1: Create Products Page

Create `frontend/src/pages/Products.tsx` with:
- Products grid/list view
- Search bar
- Category filter dropdown
- Sort options (name, price, date)
- Add product button

#### Task 4.2: Create Product Form Modal

Implement modal for add/edit with:
- Name input
- Description textarea
- Price and stock inputs
- Category select
- Image file upload
- Form validation

#### Task 4.3: Implement CRUD Operations

- Fetch products from API
- Create new product
- Update existing product
- Delete with confirmation
- Error handling

**✅ Checkpoint 4**: Test full product lifecycle
- Add new product with image
- Edit product details
- Delete product
- Search and filter products

---

### Exercise 5: Dashboard with Real Data (30%)

**Goal**: Create dashboard displaying statistics from database.

#### Task 5.1: Create Dashboard Controller

In `backend/src/controllers/dashboardController.ts`:
- Count total users
- Count total products
- Calculate total inventory value
- Get top products
- Recent activity log

#### Task 5.2: Create Dashboard UI

Create `frontend/src/pages/Dashboard.tsx` with:
- Stats cards (users, products, revenue)
- Top products table
- Recent activity feed
- Quick action cards
- Clean, modern design

**✅ Final Checkpoint**: Complete application test
- Full authentication flow
- Complete CRUD operations
- Dashboard shows real data
- Image upload works
- Search and filters work

---

## Bonus Challenges

### Challenge 1: Advanced Search (20 points)
- Implement multi-field search
- Add price range filter
- Stock level indicators

### Challenge 2: Performance (15 points)
- Add pagination to products list
- Implement infinite scroll
- Lazy load images

### Challenge 3: User Experience (15 points)
- Add loading skeletons
- Toast notifications
- Smooth animations

---

## Submission Guidelines

### Required Deliverables
1. **Source Code** - Complete backend and frontend code
2. **README.md** - Setup instructions and API documentation
3. **Screenshots** - Working application screenshots
4. **Demo Video** (optional) - 2-3 minute walkthrough

### Code Quality Requirements
- ✅ Clean, readable code with comments
- ✅ Proper error handling
- ✅ TypeScript types for all functions
- ✅ No console errors
- ✅ Responsive design

### Testing Checklist
- [ ] Register and login work
- [ ] Protected routes redirect correctly
- [ ] All CRUD operations work
- [ ] Image upload succeeds
- [ ] Search and filters work
- [ ] Dashboard shows real data
- [ ] Application is responsive

---

## Troubleshooting Guide

### Common Issues

**Backend won't start**
```bash
# Check MongoDB connection
# Verify .env file exists
# Check port 5000 is not in use
```

**Image upload fails**
```bash
# Create uploads/ directory
mkdir uploads
# Check file permissions
```

**Frontend can't connect to backend**
```bash
# Check CORS configuration
# Verify API_URL in frontend
# Check backend is running
```

---

## Resources

### Documentation
- [Express.js Guide](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/)
- [Multer Guide](https://github.com/expressjs/multer)

### Example Code
- See `example/` folder for reference implementation
- Check `solutions/` for step-by-step solutions

---

## Next Steps

After completing this lab:
1. Deploy to production (Vercel + Railway/Render)
2. Add more features (reviews, ratings, categories)
3. Implement real-time updates with WebSockets
4. Add admin panel
5. Build mobile app with React Native

**Congratulations!** 🎉 You've built a complete full-stack application!
