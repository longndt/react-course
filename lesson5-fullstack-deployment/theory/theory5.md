# Theory - Full Stack Development & Deployment

---

## Table of Contents

1. [Why Full-Stack Development?](#why-full-stack-development)
2. [Backend with Express.js](#backend-with-expressjs)
3. [Database with MongoDB](#database-with-mongodb)
4. [Authentication & Authorization](#authentication--authorization)
5. [File Upload & Media Management](#file-upload--media-management)
6. [Performance Optimization](#performance-optimization)
7. [Production Deployment](#production-deployment)
8. [CI/CD Pipeline - Complete Workflow](#cicd-pipeline---complete-workflow)
9. [Common Mistakes](#common-mistakes)
10. [Next Steps](#next-steps)

---

## Why Full-Stack Development?

> 🏗️ **Visual Learning** For a comprehensive understanding of project architecture, see [Project Architecture Diagram](../../diagrams/project_architecture.md)

**Complete Application Stack:**

- **Frontend** - React user interface

- **Backend** - Express.js API server

- **Database** - MongoDB data storage

- **Deployment** - Production hosting

**Key Benefits:**
- Full control over entire application
- Better performance optimization
- Industry-standard professional skills
- Production-ready deployment

---

## Backend with Express.js

### Setup Express Server

```bash
# Create backend directory
mkdir backend && cd backend
npm init -y

# Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install multer express-rate-limit helmet
npm install -D nodemon typescript @types/node @types/express
```

### Project Structure

```
backend/
├── src/
│   ├── controllers/          # Business logic
│   │   ├── authController.ts
│   │   ├── dashboardController.ts
│   │   └── uploadController.ts
│   ├── routes/              # HTTP routing
│   │   ├── auth.ts
│   │   ├── dashboard.ts
│   │   └── upload.ts
│   ├── models/              # Database schemas
│   │   ├── User.ts
│   │   └── Dashboard.ts
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── config/             # Configuration
│   │   └── upload.ts
│   └── server.ts           # Entry point
└── package.json
```

### Basic Express Server

```typescript
// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import uploadRoutes from './routes/upload';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/upload', uploadRoutes);

// Error handler
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
});
```

### Route Example

```typescript
// routes/auth.ts
import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
```

### Controller Example

```typescript
// controllers/authController.ts
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

---

## Database with MongoDB

### User Model

```typescript
// models/User.ts
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
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
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

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
```

### Dashboard Model

```typescript
// models/Dashboard.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IDashboard extends Document {
  userId: mongoose.Types.ObjectId;
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  monthlyGrowth: number;
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
  recentActivity: Array<{
    type: string;
    description: string;
    timestamp: Date;
  }>;
}

const dashboardSchema = new Schema<IDashboard>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalUsers: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  monthlyGrowth: { type: Number, default: 0 },
  topProducts: [{
    name: String,
    sales: Number,
    revenue: Number
  }],
  recentActivity: [{
    type: String,
    description: String,
    timestamp: { type: Date, default: Date.now }
  }]
}, {
  timestamps: true
});

dashboardSchema.index({ userId: 1 });

export default mongoose.model<IDashboard>('Dashboard', dashboardSchema);
```

---

## Authentication & Authorization

### Auth Middleware

```typescript
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;

    // Get token from header
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    // Get user from token
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

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};
```

---

## File Upload & Media Management

### Upload Configuration

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
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
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

### Upload Routes

```typescript
// routes/upload.ts
import express from 'express';
import { protect } from '../middleware/auth';
import { uploadConfig } from '../config/upload';
import { uploadFile, uploadMultipleFiles } from '../controllers/uploadController';

const router = express.Router();

router.post('/single', protect, uploadConfig.single('file'), uploadFile);
router.post('/multiple', protect, uploadConfig.array('files', 10), uploadMultipleFiles);

export default router;
```

### Upload Controller

```typescript
// controllers/uploadController.ts
import { Request, Response } from 'express';

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      success: true,
      data: {
      filename: req.file.filename,
        path: `/uploads/${req.file.filename}`,
        size: req.file.size
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};

export const uploadMultipleFiles = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = req.files.map(file => ({
        filename: file.filename,
      path: `/uploads/${file.filename}`,
      size: file.size
    }));

    res.json({
      success: true,
      data: { files }
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};
```

---

## Performance Optimization

### Frontend Optimization

#### 1. Code Splitting & Lazy Loading

```typescript
// App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const FileManager = lazy(() => import('./pages/FileManager'));
const PerformanceDemo = lazy(() => import('./pages/PerformanceDemo'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/files" element={<FileManager />} />
          <Route path="/performance" element={<PerformanceDemo />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}
```

#### 2. React.memo & useMemo

```typescript
// Memoize expensive components
const ExpensiveComponent = React.memo(({ data }: { data: string[] }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
});

// Memoize expensive calculations
function DataList({ items }: { items: Item[] }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  return <div>{/* render sortedItems */}</div>;
}
```

#### 3. Virtual Lists

```typescript
// components/VirtualList.tsx
import { useRef, useState, useEffect } from 'react';

interface VirtualListProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}

export default function VirtualList({ items, itemHeight, containerHeight, renderItem }: VirtualListProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => renderItem(item, startIndex + index))}
        </div>
      </div>
    </div>
  );
}
```

### Backend Optimization

```typescript
// Add indexes to frequently queried fields
userSchema.index({ email: 1 });
dashboardSchema.index({ userId: 1 });

// Use lean() for read-only queries
const users = await User.find().lean();

// Use select() to limit fields
const users = await User.find().select('name email');

// Use pagination
const page = 1;
const limit = 10;
const users = await User.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

---

## Production Deployment

### Environment Variables

```bash
# .env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-change-this
```

### Frontend Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
```

### Deployment Platforms

#### Vercel (Frontend)

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
      "src": "/api/(.*)",
      "dest": "https://your-backend-api.com/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### PM2 (Backend on VPS)

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'backend',
    script: 'dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env_production: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

```bash
# Deploy commands
npm run build
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

---

## CI/CD Pipeline - Complete Workflow

### Complete Step-by-Step Guide

#### **Step 1: Code Your Application**

Complete your frontend and backend code in your local environment.

```bash
# Test locally
cd frontend && npm run dev
cd backend && npm run dev
```

#### **Step 2: Create GitHub Actions Workflow**

Create a workflow file to automatically test and build code when pushing to GitHub:

```bash
# Create workflow directory
mkdir -p .github/workflows
```

#### **Step 3: Frontend CI/CD Configuration**

Create file `.github/workflows/frontend-deploy.yml`:

```yaml
name: Frontend CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # 1. Checkout code
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      # 3. Install dependencies
      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      # 4. Build application
      - name: Build application
        working-directory: ./frontend
        run: npm run build
        env:
          VITE_API_URL: ${{ secrets.VITE_API_URL }}

      # 5. Deploy to Vercel (on main branch)
      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'
```

#### **Step 4: Backend CI/CD Configuration**

Create file `.github/workflows/backend-deploy.yml`:

```yaml
name: Backend CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      # 1. Checkout code
      - name: Checkout code
        uses: actions/checkout@v4

      # 2. Setup Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: backend/package-lock.json

      # 3. Install dependencies
      - name: Install dependencies
        working-directory: ./backend
        run: npm ci

      # 4. Build TypeScript
      - name: Build application
        working-directory: ./backend
        run: npm run build

      # 5. Deploy to VPS via SSH (on main branch)
      - name: Deploy to Production Server
        if: github.ref == 'refs/heads/main'
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/your-app
            git pull origin main
            cd backend
            npm ci --production
            npm run build
            pm2 restart backend
```

#### **Step 5: Setup GitHub Secrets**

Go to GitHub repository → Settings → Secrets and variables → Actions, add the following secrets:

**Frontend Secrets:**
```
VERCEL_TOKEN=your_vercel_token_here
VERCEL_ORG_ID=your_org_id_here
VERCEL_PROJECT_ID=your_project_id_here
VITE_API_URL=https://api.yourdomain.com
```

**Backend Secrets:**
```
SERVER_HOST=your-server-ip
SERVER_USERNAME=deploy
SERVER_SSH_KEY=your_private_ssh_key_content
```

**How to get Vercel credentials:**
```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
cd frontend
vercel link

# Get token from: https://vercel.com/account/tokens
# Get ORG_ID and PROJECT_ID from: .vercel/project.json
```

#### **Step 6: Push Code to GitHub**

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add CI/CD workflows"

# Push to GitHub
git push origin main
```

#### **Step 7: Monitor Deployment**

1. Go to GitHub repository → ** Actions** tab
2. View running workflow (yellow = running, green = success, red = failed)
3. Click on workflow to see detailed logs for each step
4. If there are errors, check logs for debugging

#### **Step 8: Verify Deployment**

**Frontend (Vercel):**
1. Go to https://vercel.com/dashboard
2. Click on your project
3. View deployment URL (example: https://your-app.vercel.app)
4. Test application on production URL

**Backend (VPS with PM2):**
```bash
# SSH to your server
ssh deploy@your-server-ip

# Check PM2 status
pm2 status

# View logs
pm2 logs backend

# Monitor in real-time
pm2 monit
```

#### **Step 9: Setup Custom Domain (Optional)**

**Vercel:**
1. Go to project Settings → Domains
2. Add custom domain (example: www.yourdomain.com)
3. Update DNS records according to instructions

**Backend:**
```bash
# Install nginx
sudo apt install nginx

# Configure nginx
sudo nano /etc/nginx/sites-available/your-app

# Add configuration:
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site and restart nginx
sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Setup SSL with Let's Encrypt
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

### Flow Diagram

```
┌─────────────────┐
│  Developer      │
│  writes code    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  git add .      │
│  git commit     │
│  git push       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│  GitHub                 │
│  Triggers Workflow      │
└────────┬────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Frontend│ │Backend │
│ Build  │ │ Build  │
└───┬────┘ └───┬────┘
    │          │
    ▼          ▼
┌────────┐ ┌────────┐
│ Vercel │ │  VPS   │
│ Deploy │ │ Deploy │
└───┬────┘ └───┬────┘
    │          │
    ▼          ▼
┌────────────────────┐
│   Production       │
│   Live ✅          │
└────────────────────┘
```

### Troubleshooting CI/CD

**Common Issues:**

1. **Build fails on GitHub Actions:**
   ```bash
   # Check package-lock.json is committed
   git add package-lock.json
   git commit -m "Add package-lock.json"
   ```

2. **Deployment fails:**
   - Verify all secrets are correctly set
   - Check environment variables
   - Review workflow logs in GitHub Actions

3. **Backend not starting after deployment:**
   ```bash
   # SSH to server and check logs
   pm2 logs backend --lines 100

   # Restart if needed
   pm2 restart backend
   ```

---

## Common Mistakes

### Backend Mistakes

**1. Not validating input:**
```typescript
// ❌ Bad
export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body); // No validation!
};

// ✅ Good
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields required' });
  }

  const user = await User.create({ name, email, password });
};
```

**2. Exposing sensitive data:**
```typescript
// ❌ Bad
const user = await User.findById(id); // Returns password!

// ✅ Good
const user = await User.findById(id).select('-password');
```

**3. Not handling errors:**
```typescript
// ❌ Bad
const users = await User.find(); // Will crash if database error

// ✅ Good
  try {
    const users = await User.find();
  res.json({ success: true, data: users });
  } catch (error) {
  res.status(500).json({ error: 'Server error' });
  }
```

### Frontend Mistakes

**1. Not handling loading states:**
```typescript
// ❌ Bad
function DataList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData);
  }, []);

  return <div>{data.map(...)}</div>; // Empty until loaded!
}

// ✅ Good
function DataList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  return <div>{data.map(...)}</div>;
}
```

**2. Memory leaks:**
```typescript
// ❌ Bad
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 1000);
  // Never cleaned up!
}, []);

// ✅ Good
useEffect(() => {
  const interval = setInterval(() => {
    fetchData();
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

---

## Next Steps

### What You've Learned

✅ **Backend Development:**
- Express.js server setup and configuration
- RESTful API design with routes and controllers
- MongoDB integration and schema design
- Authentication with JWT
- File upload handling

✅ **Performance:**
- Code splitting and lazy loading
- React.memo and useMemo optimization
- Virtual lists for large datasets
- Database indexing and query optimization

✅ **Deployment:**
- Environment configuration
- Production build optimization
- Vercel deployment for frontend
- VPS deployment with PM2 for backend

- **Complete CI/CD workflow from code to production**

### Advanced Topics to Explore

🚀 **Next Level:**
- **GraphQL** - Alternative to REST APIs

- **WebSockets** - Real-time communication

- **Docker & Kubernetes** - Container orchestration

- **Microservices** - Distributed architecture

- **AWS/Azure/GCP** - Cloud platforms

- **Testing** - Unit, integration, and E2E tests

---