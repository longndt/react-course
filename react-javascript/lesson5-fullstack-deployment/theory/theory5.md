# Theory - Full-Stack Development & Deployment

---

## Table of Contents

1. [Why Full-Stack Development?](#why-full-stack-development)
2. [Backend with Express.js](#backend-with-expressjs)
3. [Database with MongoDB](#database-with-mongodb)
4. [File Upload & Media Management](#file-upload--media-management)
5. [Performance Optimization](#performance-optimization)
6. [Production Deployment](#production-deployment)
7. [CI/CD Pipelines](#cicd-pipelines)
8. [Monitoring & Debugging](#monitoring--debugging)
9. [Common Mistakes](#common-mistakes)
10. [Next Steps](#next-steps)

---

## Why Full-Stack Development?

> 🏗️ **Visual Learning**: For a comprehensive understanding of project architecture, see [Project Architecture Diagram](../../diagrams/project_architecture.md)

**Complete Application Development:**

- **Frontend** - React user interface
- **Backend** - Express.js API server
- **Database** - MongoDB data storage
- **Deployment** - Production hosting

**Key Benefits:**
- **Full Control** - End-to-end application ownership
- **Better Performance** - Optimized for your specific needs
- **Scalability** - Can handle growth and traffic
- **Professional** - Industry-standard full-stack skills

---

## Backend with Express.js

### Setup Express Server

```bash
# Create backend directory
mkdir backend && cd backend
npm init -y

# Install dependencies
npm install express mongoose cors dotenv
npm install -D nodemon
```

### Basic Express Server

```javascript
// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

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

### API Routes

```javascript
// routes/users.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// GET /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/users
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' });
  }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
```

---

## Database with MongoDB

### MongoDB Setup

```bash
# Install MongoDB locally or use MongoDB Atlas
npm install mongoose
```

### Mongoose Models

```javascript
// File: models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

module.exports = mongoose.model('User', userSchema);
```

### Database Connection

```javascript
// config/database.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Advanced Queries

```javascript
// services/userService.js
const User = require('../models/User');

class UserService {
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

module.exports = UserService;
```

---

## File Upload & Media Management

### Multer Setup

```bash
npm install multer
```

### File Upload Configuration

```javascript
// config/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

module.exports = upload;
```

### Upload Routes

```javascript
// routes/upload.js
const express = require('express');
const upload = require('../config/upload');

const router = express.Router();

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Multiple file upload
router.post('/multiple', upload.array('images', 5), (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    res.json({
      message: 'Files uploaded successfully',
      files: files.map(file => ({
        filename: file.filename,
        path: file.path,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
```

---

## Performance Optimization

### Frontend Optimization

```javascript
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

```javascript
// Caching with Redis
const Redis = require('ioredis');

const redis = new Redis(process.env.REDIS_URL);

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;

    try {
      const cached = await redis.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }

      res.sendResponse = res.json;
      res.json = (body) => {
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

> 🚀 **Visual Learning**: For a comprehensive understanding of deployment flow, see [Deployment Flow Diagram](../../diagrams/deployment_flow.md)

### Environment Configuration

```javascript
// config/environment.js
const config = {
  development: {
    port: process.env.PORT || 3001,
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  },
  production: {
    port: process.env.PORT || 3001,
    mongoUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
  },
};

module.exports = config[process.env.NODE_ENV] || config.development;
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

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
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

```javascript
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
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

module.exports = errorHandler;
```

### Logging

```javascript
// utils/logger.js
const winston = require('winston');

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

module.exports = logger;
```

---

## Common Mistakes

### Mistake 1: Not handling environment variables

```javascript
// ❌ Wrong - hardcoded values
const PORT = 3001;
const MONGODB_URI = 'mongodb://localhost:27017/myapp';

// ✅ Correct - environment variables
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
```

### Mistake 2: Not validating input data

```javascript
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

```javascript
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

```javascript
// ❌ Wrong - inefficient query
const users = await User.find().populate('posts');

// ✅ Correct - optimized query
const users = await User.find()
  .select('name email')
  .populate('posts', 'title')
  .limit(10)
  .sort({ createdAt: -1 });
```

---

## Next Steps

### What You Should Know After Lesson 5

**Full-Stack Development:**
- Express.js backend with JavaScript
- MongoDB database with Mongoose
- File upload and media management
- API design and best practices

**Performance & Optimization:**
- Frontend code splitting and memoization
- Backend caching and query optimization
- Production deployment strategies

**DevOps & Deployment:**
- Docker containerization
- CI/CD pipelines
- Environment configuration
- Monitoring and debugging

### Career Paths

🔜 **Frontend Developer** - Specialize in React and user interfaces
🔜 **Backend Developer** - Focus on APIs and server-side development
🔜 **Full-Stack Developer** - End-to-end application development
🔜 **DevOps Engineer** - Infrastructure and deployment automation

### Advanced Topics

🔜 **Microservices** - Distributed system architecture
🔜 **GraphQL** - Alternative to REST APIs
🔜 **WebSockets** - Real-time communication
🔜 **Cloud Platforms** - AWS, Azure, Google Cloud

> **Advanced Topics**: For advanced patterns, performance optimization, and complex examples, see [Advanced Patterns](../../extras/advanced_patterns.md) and [Performance Optimization](../../extras/performance_optimization.md)
