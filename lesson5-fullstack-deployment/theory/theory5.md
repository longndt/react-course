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
8. [CI/CD Pipeline - Complete Flow](#cicd-pipeline---complete-flow)
9. [Common Mistakes](#common-mistakes)
10. [Next Steps](#next-steps)

---

## Why Full-Stack Development?

> 🏗️ **Visual Learning** For a comprehensive understanding of project architecture, see [Project Architecture Diagram](../../diagrams/project_architecture.md)

**Complete Application Stack:**

- **Frontend** - React user interface
- **Backend** - Express.js API server
- **Database** - MongoDB data storage
- **Deployment** - Production hosting with CI/CD

**Key Benefits:**
- **Full Control** - End-to-end application ownership
- **Better Performance** - Optimized for specific needs
- **Scalability** - Handle growth and traffic
- **Professional** - Industry-standard full-stack skills

---

## Backend with Express.js

### Quick Setup

```bash
# Create and initialize backend
mkdir backend && cd backend
npm init -y

# Install dependencies
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer
npm install -D nodemon typescript @types/node @types/express
```

### Basic Server Structure

```typescript
// src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Clean Architecture & Code Organization

### Why Separate Routes and Controllers?

**Benefits:**
- **Separation of Concerns** - Routes handle HTTP, controllers handle business logic
- **Maintainability** - Easier to modify and test
- **Reusability** - Controllers can be reused
- **Scalability** - Better organization as app grows

### Project Structure

```
backend/
├── src/
│   ├── controllers/       # Business logic
│   │   ├── authController.ts
│   │   ├── dashboardController.ts
│   │   └── uploadController.ts
│   ├── routes/           # HTTP routing
│   │   ├── auth.ts
│   │   ├── dashboard.ts
│   │   └── upload.ts
│   ├── models/           # Database schemas
│   ├── middleware/       # Auth, error handling
│   ├── config/          # Configuration
│   └── utils/           # Helper functions
└── package.json
```

### Controller Example

```typescript
// controllers/authController.ts
import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
};
```

### Routes Example

```typescript
// routes/auth.ts
import express from 'express';
import { register, login } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
```

---

## Database with MongoDB

### MongoDB Schema Example

```typescript
// models/User.ts
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
```

### Authentication Middleware

```typescript
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalid' });
  }
};
```

---

## File Upload & Media Management

### Multer Configuration

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

export const uploadConfig = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});
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
      file: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        url: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
};
```

---

## Performance Optimization

### 1. Virtual Lists (Large Data Sets)

```typescript
// components/VirtualList.tsx
import React, { useState, useRef, useEffect } from 'react';

interface VirtualListProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}

const VirtualList: React.FC<VirtualListProps> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight),
    items.length
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((item, index) => renderItem(item, startIndex + index))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
```

### 2. Code Splitting & Lazy Loading

```typescript
// App.tsx
import React, { lazy, Suspense } from 'react';
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

### 3. Memoization

```typescript
import React, { useMemo, useCallback } from 'react';

const ExpensiveComponent = ({ data, onItemClick }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveOperation(item)
    }));
  }, [data]);

  // Memoize callbacks
  const handleClick = useCallback((id) => {
    onItemClick(id);
  }, [onItemClick]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.computed}
        </div>
      ))}
    </div>
  );
};

export default React.memo(ExpensiveComponent);
```

---

## Production Deployment

### Frontend Build Optimization

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  }
});
```

### Environment Variables

```typescript
// Frontend: .env
VITE_API_URL=https://api.yourdomain.com
VITE_APP_NAME=MyApp

// Backend: .env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mydb
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

### Deployment Platforms

**Frontend (Vercel):**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

**Backend (PM2):**
```json
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
};
```

---

## CI/CD Pipeline - Complete Flow

### Overview: From Code to Production

```
Code Complete → Create Workflow → Push to GitHub → Check Actions → Deploy
```

### Step-by-Step Implementation

#### Step 1: Write Your Code

Complete your feature with tests:
```bash
# Make sure your code works locally
npm run dev         # Test development
npm run build      # Test production build
npm test          # Run tests (if any)
```

#### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  # Job 1: Test and Build
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      # Frontend build
      - name: Install frontend dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Build frontend
        working-directory: ./frontend
        run: npm run build

      - name: Upload frontend build
        uses: actions/upload-artifact@v4
        with:
          name: frontend-dist
          path: frontend/dist

      # Backend build
      - name: Install backend dependencies
        working-directory: ./backend
        run: npm ci

      - name: Build backend
        working-directory: ./backend
        run: npm run build

      - name: Upload backend build
        uses: actions/upload-artifact@v4
        with:
          name: backend-dist
          path: backend/dist

  # Job 2: Deploy Frontend to Vercel
  deploy-frontend:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Download build
        uses: actions/download-artifact@v4
        with:
          name: frontend-dist
          path: frontend/dist

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./frontend

  # Job 3: Deploy Backend to Server
  deploy-backend:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - name: Deploy to Production Server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/myapp
            git pull origin main
            cd backend
            npm ci --production
            npm run build
            pm2 restart backend
```

#### Step 3: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:

**For Vercel (Frontend):**
```
VERCEL_TOKEN          → Get from https://vercel.com/account/tokens
VERCEL_ORG_ID         → Run: vercel link (in your project)
VERCEL_PROJECT_ID     → Run: vercel link (in your project)
```

**For Server (Backend):**
```
SERVER_HOST          → Your server IP or domain
SERVER_USERNAME      → SSH username (usually: ubuntu, root, or deploy)
SSH_PRIVATE_KEY      → Your SSH private key content
```

#### Step 4: Push Code to GitHub

```bash
# Add workflow file
git add .github/workflows/deploy.yml

# Commit and push
git add .
git commit -m "Add CI/CD pipeline"
git push origin main
```

#### Step 5: Monitor Deployment

1. Go to your GitHub repository
2. Click "Actions" tab
3. You'll see your workflow running
4. Click on the workflow to see detailed logs

**What happens:**
- ✅ Code is checked out
- ✅ Dependencies installed
- ✅ Build created
- ✅ Tests run (if configured)
- ✅ Deployed to Vercel (frontend)
- ✅ Deployed to server (backend)

#### Step 6: Verify Deployment

**Frontend:**
- Visit your Vercel URL
- Check console for errors
- Test all features

**Backend:**
- Test API endpoints
- Check server logs: `pm2 logs backend`
- Monitor: `pm2 status`

### Quick Vercel Setup

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link project (in frontend directory)
cd frontend
vercel link

# This creates .vercel folder with project.json
# Copy org_id and project_id to GitHub Secrets
```

### Quick Server Setup (Backend)

```bash
# SSH to your server
ssh user@your-server.com

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone your repository
cd /var/www
git clone https://github.com/yourusername/your-repo.git myapp
cd myapp/backend

# Install and build
npm ci --production
npm run build

# Start with PM2
pm2 start dist/server.js --name backend
pm2 save
pm2 startup  # Follow instructions

# Setup MongoDB (if not using Atlas)
# Or configure MongoDB Atlas connection string in .env
```

### Troubleshooting CI/CD

**Build Fails:**
```bash
# Check logs in GitHub Actions
# Common fixes:
- Ensure all dependencies in package.json
- Check Node.js version matches
- Verify environment variables
```

**Deployment Fails:**
```bash
# Vercel: Check build command and output directory
# Server: Check SSH key and permissions
# Both: Verify all secrets are set correctly
```

**Server Not Starting:**
```bash
# SSH to server and check:
pm2 logs backend
pm2 status

# Common issues:
- Port already in use: pm2 delete backend && pm2 start ...
- Environment variables: Check .env file
- MongoDB connection: Verify MONGODB_URI
```

### Best Practices

1. **Test Locally First** - Never push untested code
2. **Use Environment Variables** - Never commit secrets
3. **Monitor Deployments** - Always check Actions tab after push
4. **Staged Rollouts** - Test on staging before production
5. **Keep Logs** - Enable logging for debugging

---

## Common Mistakes

### 1. Security Issues

❌ **Bad:**
```typescript
// Exposing sensitive data
const user = await User.findById(id);
res.json(user); // Includes password!
```

✅ **Good:**
```typescript
const user = await User.findById(id).select('-password');
res.json(user);
```

### 2. Missing Error Handling

❌ **Bad:**
```typescript
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user); // What if user doesn't exist?
});
```

✅ **Good:**
```typescript
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

### 3. Not Using Environment Variables

❌ **Bad:**
```typescript
mongoose.connect('mongodb://localhost:27017/mydb');
const token = jwt.sign({ id }, 'hardcoded-secret');
```

✅ **Good:**
```typescript
mongoose.connect(process.env.MONGODB_URI!);
const token = jwt.sign({ id }, process.env.JWT_SECRET!);
```

### 4. Inefficient Database Queries

❌ **Bad:**
```typescript
// N+1 query problem
const users = await User.find();
for (const user of users) {
  user.posts = await Post.find({ userId: user._id });
}
```

✅ **Good:**
```typescript
// Use populate
const users = await User.find().populate('posts');
```

### 5. No Input Validation

❌ **Bad:**
```typescript
const user = await User.create(req.body); // Dangerous!
```

✅ **Good:**
```typescript
const { name, email, password } = req.body;
if (!name || !email || !password) {
  return res.status(400).json({ error: 'Missing required fields' });
}
const user = await User.create({ name, email, password });
```

---

## Next Steps

### You've Mastered

✅ **Full-Stack Development** - Frontend + Backend + Database
✅ **Clean Architecture** - Separation of routes and controllers
✅ **Authentication & Security** - JWT, password hashing
✅ **File Upload** - Multer configuration and handling
✅ **Performance Optimization** - Virtual lists, code splitting, memoization
✅ **Production Deployment** - Vercel, PM2, environment config
✅ **CI/CD** - Automated testing and deployment

### Career Paths

🚀 **Frontend Developer** - Specialize in React and user interfaces
🚀 **Backend Developer** - Focus on APIs and server-side development
🚀 **Full-Stack Developer** - End-to-end application development
🚀 **DevOps Engineer** - Infrastructure and deployment automation

### Continue Learning

📚 **Advanced Topics:**
- GraphQL as alternative to REST
- WebSockets for real-time features
- Microservices architecture
- Docker & Kubernetes
- Cloud platforms (AWS, Azure, GCP)

📚 **Resources:**
- [Advanced Patterns](../../extras/advanced_patterns.md)
- [Performance Optimization](../../extras/performance_optimization.md)
- [Security Guide](../../extras/security_guide.md)
- [Testing Strategies](../../extras/testing_strategies.md)

---
