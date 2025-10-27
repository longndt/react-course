# Reference - Full-Stack & Deployment

> **Quick reference guide for full-stack development and deployment**

## Table of Contents
1. [Why Full-Stack Development?](#why-full-stack-development)
2. [Backend with Express.js](#backend-with-expressjs)
3. [Database with MongoDB](#database-with-mongodb)
4. [File Upload & Media Management](#file-upload--media-management)
5. [Performance Optimization](#performance-optimization)
6. [Production Deployment](#production-deployment)
7. [CI/CD Pipelines](#cicd-pipelines)
8. [Monitoring & Debugging](#monitoring--debugging)
9. [Common Patterns](#common-patterns)

---

## Why Full-Stack Development?

### What is Full-Stack?
- **Frontend** - User interface (React, HTML, CSS, JavaScript)

- **Backend** - Server logic (Node.js, Express.js, APIs)

- **Database** - Data storage (MongoDB, PostgreSQL, MySQL)

- **Deployment** - Production hosting (Vercel, Railway, AWS)

### Benefits
- **Complete Control** - End-to-end application development

- **Better Integration** - Seamless frontend-backend communication

- **Performance** - Optimized for your specific needs

- **Scalability** - Can handle growth and traffic

---

## Backend with Express.js

### Setup
```bash
npm init -y
npm install express cors helmet morgan
```

### Basic Server
```javascript
// server/index.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### API Routes
```javascript
// server/routes/users.js
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
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
```

---

## Database with MongoDB

### Setup
```bash
npm install mongoose
```

### Connection
```javascript
// server/database/connection.js
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };
```

### Models
```javascript
// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
```

### Queries
```javascript
// server/services/userService.js
const User = require('../models/User');

class UserService {
  static async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  static async getUserById(id) {
    return await User.findById(id);
  }

  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async updateUser(id, userData) {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  }

  static async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  static async getAllUsers() {
    return await User.find();
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

### File Upload
```javascript
// server/middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

module.exports = { upload };
```

### Upload Route
```javascript
// server/routes/upload.js
const express = require('express');
const { upload } = require('../middleware/upload');

const router = express.Router();

router.post('/single', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      path: req.file.path
    });
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

router.post('/multiple', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const files = req.files.map(file => ({
      filename: file.filename,
      path: file.path
    }));

    res.json({
      message: 'Files uploaded successfully',
      files
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
```jsx
// Code splitting
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Memoization
import { memo, useMemo, useCallback } from 'react';

const ExpensiveComponent = memo(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }, [data]);

  const handleUpdate = useCallback((id) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <div key={item.id} onClick={() => handleUpdate(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});
```

### Backend Optimization
```javascript
// Caching
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes

app.get('/api/users', async (req, res) => {
  const cacheKey = 'users';
  let users = cache.get(cacheKey);

  if (!users) {
    users = await User.find();
    cache.set(cacheKey, users);
  }

  res.json(users);
});

// Rate limiting
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Production Deployment

### Environment Variables
```bash
# .env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
```

### Build Scripts
```json
{
  "scripts": {
    "start": "node server/index.js",
    "dev": "nodemon server/index.js",
    "build:frontend": "cd client && npm run build",
    "build:all": "npm run build:frontend"
  }
}
```

### Docker Setup
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build:all

EXPOSE 3001

CMD ["npm", "start"]
```

### Docker Compose
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
    image: mongo:latest
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
    branches: [ main ]

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

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Railway
        run: |
          # Deploy commands
          echo "Deploying to production..."
```

### Vercel Deployment
```json
{
  "version": 2,
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/client/dist/$1"
    }
  ]
}
```

---

## Monitoring & Debugging

### Logging
```javascript
// server/utils/logger.js
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
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

module.exports = logger;
```

### Error Handling
```javascript
// server/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong'
      : err.message
  });
};

module.exports = errorHandler;
```

---

## Common Patterns

### API Response Format
```javascript
// server/utils/response.js
const successResponse = (data, message) => ({
  success: true,
  data,
  message
});

const errorResponse = (error) => ({
  success: false,
  error
});

module.exports = { successResponse, errorResponse };
```

### Middleware Pattern
```javascript
// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
```

---

## Next Steps

1. **Practice** Build a complete full-stack application
2. **Learn More** Check [Theory Guide](./theory/theory5.md) for detailed explanations
3. **Deploy** Try deploying to different platforms
4. **Resources** Explore [Advanced Patterns](../../extras/advanced_patterns.md) for complex patterns

> **💡 Tip** Start with a simple full-stack app, then gradually add complexity. Always test thoroughly before deploying to production!