# Theory - Full-Stack Development & Deployment

---

## Table of Contents

1. [Why Full-Stack Development?](#why-full-stack-development)
2. [Backend with Express.js](#backend-with-expressjs)
3. [Clean Architecture & Code Organization](#clean-architecture--code-organization)
4. [Database with MongoDB](#database-with-mongodb)
5. [File Upload & Media Management](#file-upload--media-management)
6. [Performance Optimization](#performance-optimization)
7. [Production Deployment](#production-deployment)
8. [CI/CD Pipelines](#cicd-pipelines)
9. [Monitoring & Debugging](#monitoring--debugging)
10. [Common Mistakes](#common-mistakes)
11. [Next Steps](#next-steps)

---

## Why Full-Stack Development?

> 🏗️ **Visual Learning** For a comprehensive understanding of project architecture, see [Project Architecture Diagram](../../diagrams/project_architecture.md)

**Complete Application Development:**

- **Frontend**- React user interface
- **Backend**- Express.js API server
- **Database**- MongoDB data storage
- **Deployment**- Production hosting

**Key Benefits:**
- **Full Control**- End-to-end application ownership
- **Better Performance**- Optimized for your specific needs
- **Scalability**- Can handle growth and traffic
- **Professional**- Industry-standard full-stack skills

---

## Backend with Express.js

### Setup Express Server

```bash
# Create backend directory
mkdir backend && cd backend
npm init -y

# Install dependencies
npm install express mongoose cors dotenv
npm install -D nodemon @types/node typescript
```

### Basic Express Server

```typescript
// File: server/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### API Routes with Controllers

```typescript
// File: routes/users.ts
import express from 'express';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// GET /api/users
router.get('/', getUsers);

// POST /api/users
router.post('/', createUser);

// PUT /api/users/:id
router.put('/:id', updateUser);

// DELETE /api/users/:id
router.delete('/:id', deleteUser);

export default router;
```

### Controller Implementation

```typescript
// File: controllers/userController.ts
import { Request, Response } from 'express';
import User from '../models/User';

// @desc    Get all users
// @route   GET /api/users
// @access  Public
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch users' 
    });
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Public
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: 'Failed to create user' 
    });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Public
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }
    res.json({
      success: true,
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: 'Failed to update user' 
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Public
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: 'Failed to delete user' 
    });
  }
};
```

---

## Clean Architecture & Code Organization

### Why Separate Routes and Controllers?

**Benefits of Clean Architecture:**
- **Separation of Concerns**- Routes handle HTTP, controllers handle business logic
- **Maintainability**- Easier to modify and test individual components
- **Reusability**- Controllers can be reused across different routes
- **Scalability**- Better organization as the application grows
- **Team Collaboration**- Different developers can work on different layers

### Project Structure

```
backend/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   └── uploadController.ts
│   ├── routes/              # HTTP routing
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   └── upload.ts
│   ├── models/              # Database schemas
│   ├── middleware/          # Custom middleware
│   ├── config/             # Configuration files
│   └── utils/              # Helper functions
└── package.json
```

### Controller Pattern

```typescript
// controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
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
    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
```

### Route Pattern

```typescript
// routes/auth.ts
import express from 'express';
import { protect } from '../middleware/auth';
import { register, login, getMe, updateProfile } from '../controllers/authController';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;
```

### Upload Controller Example

```typescript
// controllers/uploadController.ts
import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

// @desc    Upload single file
// @route   POST /api/upload
// @access  Private
export const uploadSingleFile = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Upload failed' 
    });
  }
};

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
export const uploadMultipleFiles = (req: Request, res: Response) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No files uploaded' 
      });
    }

    const uploadedFiles = (req.files as Express.Multer.File[]).map(file => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      data: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Upload failed' 
    });
  }
};
```

### Server Configuration

```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/react-course-demo';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
```

### Best Practices

**1. Consistent Error Handling**
```typescript
// middleware/errorHandler.ts
export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: err.message,
    });
  }

  res.status(500).json({
    success: false,
    error: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
```

**2. Input Validation**
```typescript
// utils/validation.ts
import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
```

**3. Response Format**
```typescript
// utils/response.ts
export const successResponse = (res: Response, data: any, message?: string) => {
  return res.json({
    success: true,
    message: message || 'Success',
    data
  });
};

export const errorResponse = (res: Response, error: string, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    error
  });
};
```

---

## Database with MongoDB

### MongoDB Setup

```bash
# Install MongoDB locally or use MongoDB Atlas
npm install mongoose
```

### Mongoose Models

```typescript
// File: models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age?: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
}, {
  timestamps: true,
});

export const User = mongoose.model<IUser>('User', UserSchema);
```

### Database Connection

```typescript
// config/database.ts
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### Advanced Queries

```typescript
// Advanced user queries
export class UserService {
  // Get users with pagination
  static async getUsers(page = 1, limit = 10, search = '') {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  // Get user statistics
  static async getUserStats() {
    const stats = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          averageAge: { $avg: '$age' },
          minAge: { $min: '$age' },
          maxAge: { $max: '$age' },
        },
      },
    ]);

    return stats[0] || { totalUsers: 0, averageAge: 0, minAge: 0, maxAge: 0 };
  }
}
```

---

## File Upload & Media Management

### Multer Setup

```bash
npm install multer
npm install -D @types/multer
```

### File Upload Configuration

```typescript
// config/upload.ts
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
```

### Upload Routes with Controllers

```typescript
// routes/upload.ts
import express from 'express';
import { uploadConfig } from '../config/upload';
import { protect } from '../middleware/auth';
import { uploadSingleFile, uploadMultipleFiles, getFiles, deleteFile } from '../controllers/uploadController';

const router = express.Router();

// POST /api/upload
router.post('/', protect, uploadConfig.single('file'), uploadSingleFile);

// POST /api/upload/multiple
router.post('/multiple', protect, uploadConfig.array('files', 10), uploadMultipleFiles);

// GET /api/upload/files
router.get('/files', protect, getFiles);

// DELETE /api/upload/:filename
router.delete('/:filename', protect, deleteFile);

export default router;
```

### Upload Controller Implementation

```typescript
// controllers/uploadController.ts
import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

// @desc    Upload single file
// @route   POST /api/upload
// @access  Private
export const uploadSingleFile = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: 'No file uploaded' 
      });
    }

    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        filename: req.file.filename,
        path: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Upload failed' 
    });
  }
};

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
// @access  Private
export const uploadMultipleFiles = (req: Request, res: Response) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'No files uploaded' 
      });
    }

    const uploadedFiles = (req.files as Express.Multer.File[]).map(file => ({
      filename: file.filename,
      path: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      success: true,
      message: `${uploadedFiles.length} files uploaded successfully`,
      data: uploadedFiles
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Upload failed' 
    });
  }
};

// @desc    Get all uploaded files
// @route   GET /api/upload/files
// @access  Private
export const getFiles = async (req: Request, res: Response) => {
  try {
    const uploadDir = 'uploads';
    const files = await fs.readdir(uploadDir);
    
    const fileList = await Promise.all(
      files.map(async (filename) => {
        const filePath = path.join(uploadDir, filename);
        const stats = await fs.stat(filePath);
        return {
          filename,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      })
    );

    res.json({
      success: true,
      data: { files: fileList }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch files' 
    });
  }
};

// @desc    Delete file
// @route   DELETE /api/upload/:filename
// @access  Private
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    const filePath = path.join('uploads', filename);
    
    await fs.unlink(filePath);
    
    res.json({
      success: true,
      message: 'File deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: 'Failed to delete file' 
    });
  }
};
```

---

## Performance Optimization

### Frontend Optimization

```typescript
// Code splitting with React.lazy
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Suspense>
  );
}

// Memoization
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: item.value * 2,
    }));
  }, [data]);

  const handleClick = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.processed}
        </div>
      ))}
    </div>
  );
});
```

### Backend Optimization

```typescript
// Caching with Redis
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export const cacheMiddleware = (duration: number) => {
  return async (req: any, res: any, next: any) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redis.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      res.sendResponse = res.json;
      res.json = (body: any) => {
        redis.setex(key, duration, JSON.stringify(body));
        res.sendResponse(body);
      };

      next();
    } catch (error) {
      next();
    }
  };
};

// Usage
app.get('/api/users', cacheMiddleware(300), getUsers);
```

---

## Production Deployment

> 🚀 **Visual Learning** For a comprehensive understanding of deployment flow, see [Deployment Flow Diagram](../../diagrams/deployment_flow.md)

### Environment Configuration

```typescript
// config/environment.ts
export const config = {
  development: {
    port: process.env.PORT || 3001,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  },
  production: {
    port: process.env.PORT || 3001,
    mongoUri: process.env.MONGODB_URI!,
    jwtSecret: process.env.JWT_SECRET!,
  },
};

export default config[process.env.NODE_ENV as keyof typeof config] || config.development;
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/myapp
    depends_on:
      - mongo

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

---

## CI/CD Pipelines

### What is CI/CD?

**Continuous Integration (CI):**
- Automatically test code when changes are pushed
- Catch bugs early in development
- Ensure code quality and consistency

**Continuous Deployment (CD):**
- Automatically deploy code to production
- Reduce manual deployment errors
- Faster time to market

### GitHub Actions Setup

#### Step 1: Create Workflow Directory

```bash
# Create GitHub Actions directory
mkdir -p .github/workflows
```

#### Step 2: Frontend CI/CD Pipeline

```yaml
# .github/workflows/frontend-deploy.yml
name: Frontend CI/CD

on:
  push:
    branches: [main, develop]
    paths:
      - 'lesson5-fullstack-deployment/example/frontend/**'
      - 'react-javascript/lesson5-fullstack-deployment/example/frontend/**'
  pull_request:
    branches: [main]
    paths:
      - 'lesson5-fullstack-deployment/example/frontend/**'
      - 'react-javascript/lesson5-fullstack-deployment/example/frontend/**'

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        track: [typescript, javascript]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: |
            lesson5-fullstack-deployment/example/frontend/package-lock.json
            react-javascript/lesson5-fullstack-deployment/example/frontend/package-lock.json

      - name: Install dependencies
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/frontend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/frontend
          fi
          npm ci

      - name: Run linting
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/frontend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/frontend
          fi
          npm run lint

      - name: Run tests
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/frontend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/frontend
          fi
          npm test -- --coverage --watchAll=false

      - name: Build application
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/frontend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/frontend
          fi
          npm run build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v4
        with:
          name: frontend-build-${{ matrix.track }}
          path: |
            lesson5-fullstack-deployment/example/frontend/dist
            react-javascript/lesson5-fullstack-deployment/example/frontend/dist

  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: test-and-build
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: lesson5-fullstack-deployment/example/frontend

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test-and-build
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: lesson5-fullstack-deployment/example/frontend
```

#### Step 3: Backend CI/CD Pipeline

```yaml
# .github/workflows/backend-deploy.yml
name: Backend CI/CD

on:
  push:
    branches: [main, develop]
    paths:
      - 'lesson5-fullstack-deployment/example/backend/**'
      - 'react-javascript/lesson5-fullstack-deployment/example/backend/**'
  pull_request:
    branches: [main]
    paths:
      - 'lesson5-fullstack-deployment/example/backend/**'
      - 'react-javascript/lesson5-fullstack-deployment/example/backend/**'

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        track: [typescript, javascript]
    
    services:
      mongodb:
        image: mongo:5.0
        ports:
          - 27017:27017
        options: >-
          --health-cmd "mongosh --eval 'db.adminCommand(\"ping\")'"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: |
            lesson5-fullstack-deployment/example/backend/package-lock.json
            react-javascript/lesson5-fullstack-deployment/example/backend/package-lock.json

      - name: Install dependencies
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/backend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/backend
          fi
          npm ci

      - name: Run linting
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/backend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/backend
          fi
          npm run lint

      - name: Run tests
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/backend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/backend
          fi
          npm test -- --coverage --watchAll=false
        env:
          MONGODB_URI: mongodb://localhost:27017/test-db
          JWT_SECRET: test-secret
          NODE_ENV: test

      - name: Build application
        run: |
          if [ "${{ matrix.track }}" = "typescript" ]; then
            cd lesson5-fullstack-deployment/example/backend
          else
            cd react-javascript/lesson5-fullstack-deployment/example/backend
          fi
          npm run build

  deploy-staging:
    if: github.ref == 'refs/heads/develop'
    needs: test-and-build
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to Staging
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.STAGING_HOST }}
          username: ${{ secrets.STAGING_USERNAME }}
          key: ${{ secrets.STAGING_SSH_KEY }}
          script: |
            cd /var/www/react-course-backend
            git pull origin develop
            npm ci --production
            pm2 restart backend-staging

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test-and-build
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to Production
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USERNAME }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          script: |
            cd /var/www/react-course-backend
            git pull origin main
            npm ci --production
            pm2 restart backend-production
```

### Environment Setup

#### Step 1: GitHub Secrets Configuration

```bash
# Required secrets for GitHub Actions
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# For backend deployment
STAGING_HOST=staging.yourdomain.com
STAGING_USERNAME=deploy
STAGING_SSH_KEY=your_private_ssh_key

PRODUCTION_HOST=yourdomain.com
PRODUCTION_USERNAME=deploy
PRODUCTION_SSH_KEY=your_private_ssh_key
```

#### Step 2: Vercel Configuration

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "@api_url"
  }
}
```

#### Step 3: PM2 Configuration

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'backend-staging',
      script: 'dist/server.js',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'staging',
        PORT: 3001,
        MONGODB_URI: process.env.MONGODB_URI_STAGING,
        JWT_SECRET: process.env.JWT_SECRET_STAGING
      }
    },
    {
      name: 'backend-production',
      script: 'dist/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        MONGODB_URI: process.env.MONGODB_URI_PRODUCTION,
        JWT_SECRET: process.env.JWT_SECRET_PRODUCTION
      }
    }
  ]
};
```

### Docker-based CI/CD

#### Step 1: Dockerfile for Backend

```dockerfile
# Dockerfile.backend
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS runtime

WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

#### Step 2: Dockerfile for Frontend

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine AS runtime

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Step 3: Docker Compose for Local Development

```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - VITE_API_URL=http://localhost:3001
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/react-course-demo
      - JWT_SECRET=dev-secret
    depends_on:
      - mongo

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

#### Step 4: Docker-based GitHub Actions

```yaml
# .github/workflows/docker-deploy.yml
name: Docker CI/CD

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Docker Hub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push frontend
        uses: docker/build-push-action@v5
        with:
          context: ./lesson5-fullstack-deployment/example/frontend
          push: true
          tags: |
            yourusername/react-course-frontend:latest
            yourusername/react-course-frontend:${{ github.sha }}

      - name: Build and push backend
        uses: docker/build-push-action@v5
        with:
          context: ./lesson5-fullstack-deployment/example/backend
          push: true
          tags: |
            yourusername/react-course-backend:latest
            yourusername/react-course-backend:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.PRODUCTION_HOST }}
          username: ${{ secrets.PRODUCTION_USERNAME }}
          key: ${{ secrets.PRODUCTION_SSH_KEY }}
          script: |
            docker pull yourusername/react-course-frontend:latest
            docker pull yourusername/react-course-backend:latest
            docker-compose -f docker-compose.prod.yml up -d
```

### Monitoring and Notifications

#### Step 1: Slack Notifications

```yaml
# Add to any workflow
- name: Notify Slack on Success
  if: success()
  uses: 8398a7/action-slack@v3
  with:
    status: success
    text: 'Deployment successful! 🚀'
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

- name: Notify Slack on Failure
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: failure
    text: 'Deployment failed! ❌'
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

#### Step 2: Health Checks

```yaml
# Add to deployment steps
- name: Health Check
  run: |
    sleep 30
    curl -f http://localhost:3001/api/health || exit 1
    curl -f http://localhost:3000 || exit 1
```

### Best Practices

#### 1. Branch Protection Rules

```yaml
# Enable in GitHub repository settings
- Require pull request reviews before merging
- Require status checks to pass before merging
- Require branches to be up to date before merging
- Restrict pushes that create files larger than 100MB
```

#### 2. Environment-specific Configurations

```typescript
// config/environments.ts
export const environments = {
  development: {
    apiUrl: 'http://localhost:3001',
    logLevel: 'debug',
    enableSwagger: true
  },
  staging: {
    apiUrl: 'https://staging-api.yourdomain.com',
    logLevel: 'info',
    enableSwagger: true
  },
  production: {
    apiUrl: 'https://api.yourdomain.com',
    logLevel: 'error',
    enableSwagger: false
  }
};
```

#### 3. Automated Testing Strategy

```yaml
# .github/workflows/test-matrix.yml
name: Test Matrix

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]
        track: [typescript, javascript]
    
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      
      - name: Install and test
        run: |
          cd lesson5-fullstack-deployment/example/${{ matrix.track === 'typescript' && 'frontend' || 'frontend' }}
          npm ci
          npm test
```

### Troubleshooting Common Issues

#### Issue 1: Build Failures

```bash
# Check build logs
gh run list
gh run view <run-id> --log

# Common fixes
npm ci --legacy-peer-deps
rm -rf node_modules package-lock.json
npm install
```

#### Issue 2: Environment Variables

```yaml
# Ensure secrets are properly set
- name: Debug environment
  run: |
    echo "NODE_ENV: ${{ env.NODE_ENV }}"
    echo "API_URL: ${{ secrets.API_URL }}"
```

#### Issue 3: Database Connection Issues

```yaml
# Add database wait step
- name: Wait for database
  run: |
    timeout 60 bash -c 'until nc -z localhost 27017; do sleep 1; done'
```

### Vercel Deployment

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## Monitoring & Debugging

### Error Handling

```typescript
// middleware/errorHandler.ts
export const errorHandler = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message,
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'Invalid ID format',
    });
  }

  res.status(500).json({
    error: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
```

### Logging

```typescript
// utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

---

## Common Mistakes

### Mistake 1: Not handling environment variables

```typescript
// ❌ Wrong - hardcoded values
const PORT = 3001;
const MONGODB_URI = 'mongodb://localhost:27017/myapp';

// ✅ Correct - environment variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
```

### Mistake 2: Not validating input data

```typescript
// ❌ Wrong - no validation
app.post('/api/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// ✅ Correct - with validation
app.post('/api/users', async (req, res) => {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const user = new User(value);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: 'Invalid user data' });
  }
});
```

### Mistake 3: Not handling async errors

```typescript
// ❌ Wrong - unhandled promise rejection
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// ✅ Correct - with error handling
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});
```

### Mistake 4: Not optimizing database queries

```typescript
// ❌ Wrong - inefficient query
const users = await User.find().populate('posts');

// ✅ Correct - optimized query
const users = await User.find()
  .select('name email')
  .populate('posts', 'title')
  .limit(10)
  .sort({ createdAt: -1 });
```

### Mistake 5: Mixing business logic in routes

```typescript
// ❌ Wrong - business logic in routes
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Business logic mixed with routing
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id.toString());
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Correct - separated concerns
router.post('/register', register);

// In controller
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    const user = await User.create({ name, email, password });
    const token = generateToken(user._id.toString());
    
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
```

### Mistake 6: Inconsistent response formats

```typescript
// ❌ Wrong - inconsistent responses
router.get('/users', (req, res) => {
  res.json(users); // No success flag
});

router.post('/users', (req, res) => {
  res.status(201).json({ message: 'Created', user }); // Different format
});

// ✅ Correct - consistent responses
router.get('/users', (req, res) => {
  res.json({
    success: true,
    data: users
  });
});

router.post('/users', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: user
  });
});
```

---

## Next Steps

### What You Should Know After Lesson 5

**Full-Stack Development:**
- Express.js backend with TypeScript
- MongoDB database with Mongoose
- File upload and media management
- API design and best practices
- Clean architecture with separated routes and controllers

**Code Organization:**
- Controller pattern for business logic
- Route pattern for HTTP handling
- Middleware for authentication and validation
- Consistent error handling and response formats
- Project structure best practices

**Performance & Optimization:**
- Frontend code splitting and memoization
- Backend caching and query optimization
- Production deployment strategies

**DevOps & Deployment:**
- Docker containerization
- CI/CD pipelines with GitHub Actions
- Automated testing and deployment
- Environment configuration and secrets management
- Monitoring, notifications, and health checks
- Production deployment strategies (Vercel, PM2, Docker)

### Career Paths

🔜 **Frontend Developer**- Specialize in React and user interfaces
🔜 **Backend Developer**- Focus on APIs and server-side development
🔜 **Full-Stack Developer**- End-to-end application development
🔜 **DevOps Engineer**- Infrastructure and deployment automation

### Advanced Topics

🔜 **Clean Architecture**- Domain-driven design and hexagonal architecture
🔜 **Advanced CI/CD**- Multi-environment deployments, blue-green deployments
🔜 **Microservices**- Distributed system architecture
🔜 **GraphQL**- Alternative to REST APIs
🔜 **WebSockets**- Real-time communication
🔜 **Cloud Platforms**- AWS, Azure, Google Cloud
🔜 **Kubernetes**- Container orchestration and scaling

> **Advanced Topics** For advanced patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
