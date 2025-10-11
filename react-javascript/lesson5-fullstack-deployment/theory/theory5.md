# Theory - Full-Stack Integration & Production Deployment

---

##  Table of Contents

1. [Core Concepts](#1-core-concepts)
2. [Backend API Development](#2-backend-api-development)
3. [Database Integration](#3-database-integration)
4. [Frontend-Backend Integration](#4-frontend-backend-integration)
5. [File Upload & Media Management](#5-file-upload--media-management)
6. [Real-Time Features](#6-real-time-features)
7. [Performance Optimization](#7-performance-optimization)
8. [Production Build Configuration](#8-production-build-configuration)
9. [Environment Management](#9-environment-management)
10. [Deployment Strategies](#10-deployment-strategies)
11. [CI/CD Pipelines](#11-cicd-pipelines)
12. [Monitoring & Logging](#12-monitoring--logging)
13. [Security Best Practices](#13-security-best-practices)
14. [Scaling & Performance](#14-scaling--performance)
15. [Common Deployment Issues](#15-common-deployment-issues)

---

## 1. Core Concepts

### What is Full-Stack Development?

**Full-Stack** combines frontend (React) with backend (Node.js, databases) into a complete application.

**Architecture Layers:**
```
Frontend (React) → API Layer (Express) → Database (MongoDB/PostgreSQL)
```

**Why Full-Stack?**
- Build complete, production-ready applications
- Control entire data flow from UI to database
- Optimize performance across all layers
- Deploy real-world applications to the cloud

### Modern Full-Stack Architecture

**Client-Server Model:**
```
Client (Browser)               Server (Node.js)             Database
┌───────────────┐             ┌─────────────────┐         ┌──────────┐
│  React App    │  HTTP/HTTPS │  Express API    │  Query  │ MongoDB  │
│  - UI         │ ──────────> │  - Routes       │ ──────> │ or       │
│  - State      │ <────────── │  - Controllers  │ <────── │ Postgres │
│  - API calls  │   JSON      │  - Middleware   │  Data   │          │
└───────────────┘             └─────────────────┘         └──────────┘
```

**Technology Stack (MERN/PERN):**
- **M**ongoDB / **P**ostgreSQL - Database
- **E**xpress - Backend framework
- **R**eact - Frontend library
- **N**ode.js - Runtime environment

---

## 2. Backend API Development

### Express.js Setup

```bash
npm install express cors dotenv
npm install --save-dev nodemon
```

**Basic Express Server:**
```javascript
// server/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
```

### RESTful API Design

**HTTP Methods:**
- `GET` - Retrieve data
- `POST` - Create new data
- `PUT` - Update entire resource
- `PATCH` - Partial update
- `DELETE` - Remove data

**API Endpoints Example:**
```javascript
// Routes structure
app.get('/api/users', getAllUsers);
app.get('/api/users/:id', getUserById);
app.post('/api/users', createUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);
```

**Response Format:**
```javascript
// Success response
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Operation successful"
}

// Error response
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

### Middleware Implementation

```javascript
// Authentication middleware
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

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Something went wrong!' 
      : err.message
  });
};

app.use(errorHandler);
```

---

## 3. Database Integration

### MongoDB with Mongoose

```bash
npm install mongoose
```

**Connection Setup:**
```javascript
// database/connection.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

**Schema Definition:**
```javascript
// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
```

### PostgreSQL with Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

**Schema Definition:**
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  USER
  ADMIN
}
```

**Database Operations:**
```javascript
// services/userService.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
  async createUser(userData) {
    return await prisma.user.create({
      data: userData
    });
  },

  async getUserById(id) {
    return await prisma.user.findUnique({
      where: { id: parseInt(id) }
    });
  },

  async getAllUsers() {
    return await prisma.user.findMany();
  },

  async updateUser(id, userData) {
    return await prisma.user.update({
      where: { id: parseInt(id) },
      data: userData
    });
  },

  async deleteUser(id) {
    return await prisma.user.delete({
      where: { id: parseInt(id) }
    });
  }
};
```

---

## 4. Frontend-Backend Integration

### API Client Setup

```javascript
// lib/apiClient.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Custom Hooks for API

```javascript
// hooks/useApi.js
import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

export function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(url, options);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, loading, error, refetch: () => fetchData() };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useApi('/users');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### State Management with Context

```javascript
// contexts/AppContext.js
import { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
  notifications: []
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, action.payload] 
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

---

## 5. File Upload & Media Management

### File Upload Component

```javascript
// components/FileUpload.jsx
import { useState, useRef } from 'react';
import apiClient from '../lib/apiClient';

function FileUpload({ onUploadComplete }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const response = await apiClient.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      onUploadComplete?.(response.data);
      setFile(null);
      setProgress(0);
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="file-upload">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept="image/*"
      />
      {file && (
        <div>
          <p>Selected: {file.name}</p>
          <button onClick={handleUpload} disabled={uploading}>
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {uploading && (
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
```

### Backend File Upload

```javascript
// server/middleware/upload.js
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

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

export default upload;
```

### Cloud Storage Integration

```javascript
// services/cloudStorage.js
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export const uploadToS3 = async (file, key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read'
  };

  return await s3.upload(params).promise();
};

export const deleteFromS3 = async (key) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key
  };

  return await s3.deleteObject(params).promise();
};
```

---

## 6. Real-Time Features

### WebSocket Integration

```javascript
// hooks/useWebSocket.js
import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setIsConnected(true);
      setSocket(ws.current);
    };

    ws.current.onclose = () => {
      setIsConnected(false);
      setSocket(null);
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prev => [...prev, message]);
    };

    return () => {
      ws.current?.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return {
    socket,
    isConnected,
    messages,
    sendMessage
  };
}

// Usage
function ChatRoom() {
  const { isConnected, messages, sendMessage } = useWebSocket('ws://localhost:8080');

  const handleSendMessage = (text) => {
    sendMessage({
      type: 'message',
      text,
      timestamp: Date.now()
    });
  };

  return (
    <div>
      <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>{msg.text}</div>
        ))}
      </div>
      <input 
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage(e.target.value);
            e.target.value = '';
          }
        }}
      />
    </div>
  );
}
```

### Server-Sent Events

```javascript
// hooks/useServerSentEvents.js
import { useEffect, useState } from 'react';

export function useServerSentEvents(url) {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    eventSource.onerror = () => {
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
    };
  }, [url]);

  return { data, isConnected };
}

// Usage
function LiveUpdates() {
  const { data, isConnected } = useServerSentEvents('/api/events');

  return (
    <div>
      <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
      {data && <div>Latest update: {data.message}</div>}
    </div>
  );
}
```

---

## 7. Performance Optimization

### Code Splitting

```javascript
// Lazy loading components
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Route-based code splitting
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
}
```

### Memoization

```javascript
// React.memo for component memoization
import { memo } from 'react';

const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Expensive rendering logic
  return <div>{/* complex UI */}</div>;
});

// useMemo for expensive calculations
import { useMemo } from 'react';

function DataTable({ data, filter }) {
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);

  return (
    <table>
      {filteredData.map(item => (
        <tr key={item.id}>{/* render row */}</tr>
      ))}
    </table>
  );
}

// useCallback for function memoization
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <ChildComponent onClick={handleClick} />;
}
```

### Image Optimization

```javascript
// Lazy loading images
import { useState, useRef, useEffect } from 'react';

function LazyImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} {...props}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}
```

---

## 8. Production Build Configuration

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});
```

### Environment Variables

```bash
# .env.development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:8080
REACT_APP_DEBUG=true

# .env.production
REACT_APP_API_URL=https://api.myapp.com/api
REACT_APP_WS_URL=wss://api.myapp.com/ws
REACT_APP_DEBUG=false
```

### Build Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "build:analyze": "vite build --mode analyze",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production"
  }
}
```

---

## 9. Environment Management

### Environment Configuration

```javascript
// config/environment.js
const environments = {
  development: {
    API_URL: 'http://localhost:5000/api',
    WS_URL: 'ws://localhost:8080',
    DEBUG: true
  },
  staging: {
    API_URL: 'https://staging-api.myapp.com/api',
    WS_URL: 'wss://staging-api.myapp.com/ws',
    DEBUG: true
  },
  production: {
    API_URL: 'https://api.myapp.com/api',
    WS_URL: 'wss://api.myapp.com/ws',
    DEBUG: false
  }
};

const currentEnv = process.env.NODE_ENV || 'development';
export default environments[currentEnv];
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  backend:
    build: ./server
    ports:
      - "5000:5000"
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

## 10. Deployment Strategies

### Vercel Deployment

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
    "REACT_APP_API_URL": "@api-url"
  }
}
```

### Netlify Deployment

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  REACT_APP_API_URL = "https://api.myapp.com/api"
```

### AWS S3 + CloudFront

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Deploy to S3
        run: aws s3 sync dist/ s3://my-bucket --delete
      - name: Invalidate CloudFront
        run: aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
```

---

## 11. CI/CD Pipelines

### GitHub Actions

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run linting
        run: npm run lint
      - name: Build
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Deployment commands
```

### GitLab CI

```yaml
# .gitlab-ci.yml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
    - npm run lint

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache aws-cli
    - aws s3 sync dist/ s3://my-bucket --delete
  only:
    - main
```

---

## 12. Monitoring & Logging

### Error Tracking

```javascript
// services/errorTracking.js
class ErrorTracker {
  constructor() {
    this.errors = [];
  }

  logError(error, context = {}) {
    const errorInfo = {
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    this.errors.push(errorInfo);
    
    // Send to external service
    this.sendToService(errorInfo);
  }

  sendToService(errorInfo) {
    // Send to Sentry, LogRocket, etc.
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorInfo)
    });
  }
}

export const errorTracker = new ErrorTracker();

// Error boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    errorTracker.logError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Performance Monitoring

```javascript
// services/performance.js
class PerformanceMonitor {
  constructor() {
    this.metrics = [];
  }

  measurePageLoad() {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
      
      this.recordMetric('page_load_time', loadTime);
    });
  }

  measureAPIResponse(url, startTime, endTime) {
    const responseTime = endTime - startTime;
    this.recordMetric('api_response_time', responseTime, { url });
  }

  recordMetric(name, value, context = {}) {
    const metric = {
      name,
      value,
      context,
      timestamp: Date.now()
    };

    this.metrics.push(metric);
    this.sendMetric(metric);
  }

  sendMetric(metric) {
    // Send to analytics service
    fetch('/api/metrics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metric)
    });
  }
}

export const performanceMonitor = new PerformanceMonitor();
```

---

## 13. Security Best Practices

### Input Validation

```javascript
// utils/validation.js
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8 && 
         /[A-Z]/.test(password) && 
         /[0-9]/.test(password) &&
         /[!@#$%^&*]/.test(password);
};

export const sanitizeInput = (input) => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '');
};
```

### HTTPS Configuration

```javascript
// server/security.js
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### CORS Configuration

```javascript
// server/cors.js
import cors from 'cors';

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://myapp.com',
      'https://www.myapp.com'
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

---

## 14. Scaling & Performance

### Database Optimization

```javascript
// Database indexing
// MongoDB
db.users.createIndex({ email: 1 }, { unique: true });
db.posts.createIndex({ createdAt: -1 });
db.posts.createIndex({ authorId: 1, createdAt: -1 });

// PostgreSQL
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_author_created ON posts(author_id, created_at DESC);
```

### Caching Strategies

```javascript
// Redis caching
import redis from 'redis';

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

export const cache = {
  async get(key) {
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  },

  async set(key, value, ttl = 3600) {
    await client.setex(key, ttl, JSON.stringify(value));
  },

  async del(key) {
    await client.del(key);
  }
};

// Usage in API
app.get('/api/users/:id', async (req, res) => {
  const cacheKey = `user:${req.params.id}`;
  
  let user = await cache.get(cacheKey);
  if (!user) {
    user = await User.findById(req.params.id);
    await cache.set(cacheKey, user, 300); // 5 minutes
  }
  
  res.json(user);
});
```

### Load Balancing

```nginx
# nginx.conf
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    listen 80;
    server_name myapp.com;

    location / {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 15. Common Deployment Issues

### Environment Variables

**Problem:** Environment variables not loaded
```javascript
// Solution: Check .env file location and format
// .env should be in project root
REACT_APP_API_URL=https://api.myapp.com
REACT_APP_DEBUG=true

// Access in code
const apiUrl = process.env.REACT_APP_API_URL;
```

### CORS Issues

**Problem:** CORS errors in production
```javascript
// Solution: Configure CORS properly
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
```

### Build Failures

**Problem:** Build fails due to memory issues
```bash
# Solution: Increase Node.js memory
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Database Connection

**Problem:** Database connection fails in production
```javascript
// Solution: Use connection pooling
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

---

## Summary

**Full-Stack Development:**
- Combine React frontend with Node.js backend
- Use Express.js for API development
- Integrate with MongoDB or PostgreSQL
- Implement proper error handling and validation

**Performance Optimization:**
- Code splitting and lazy loading
- Memoization with React.memo, useMemo, useCallback
- Image optimization and lazy loading
- Database indexing and query optimization

**Deployment Strategies:**
- Use Docker for containerization
- Deploy to Vercel, Netlify, or AWS
- Implement CI/CD pipelines
- Monitor performance and errors

**Security Best Practices:**
- Validate input on both frontend and backend
- Use HTTPS in production
- Implement proper CORS configuration
- Use rate limiting and security headers

**Key Takeaways:**
- Plan your architecture before coding
- Test thoroughly in different environments
- Monitor your application in production
- Keep security in mind throughout development
- Document your deployment process
- Have rollback strategies ready

---

---

---