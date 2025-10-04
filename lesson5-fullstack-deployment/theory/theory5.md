# Theory - Full-Stack Integration & Production Deployment

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
npm install --save-dev nodemon @types/express @types/node
```

**Basic Express Server:**
```typescript
// server/index.ts
import express, { Request, Response } from 'express';
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
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
```

### RESTful API Design

**CRUD Operations:**
```typescript
// server/routes/products.ts
import { Router, Request, Response } from 'express';
import { Product } from '../models/Product';

const router = Router();

// GET /api/products - List all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// POST /api/products - Create product
router.post('/', async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create product' });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

export default router;
```

### Database Integration

**MongoDB with Mongoose:**
```typescript
// server/config/database.ts
import mongoose from 'mongoose';

export async function connectDatabase() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// server/models/Product.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', productSchema);
```

**PostgreSQL with Prisma:**
```typescript
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String
  price       Decimal  @db.Decimal(10, 2)
  category    String
  inStock     Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// server/db.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Usage in routes
import { prisma } from '../db';

const products = await prisma.product.findMany();
const product = await prisma.product.create({
  data: { name: 'Product', description: 'Desc', price: 99.99, category: 'Tech' }
});
```

### Middleware

**Custom Middleware:**
```typescript
// server/middleware/logger.ts
import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} (${duration}ms)`);
  });

  next();
}

// server/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Usage
import { logger } from './middleware/logger';
import { authenticate } from './middleware/auth';

app.use(logger);
app.use('/api/protected', authenticate);
```

---

## 3. Frontend-Backend Integration

### Environment Variables

```bash
# .env (Backend)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/myapp
JWT_SECRET=your-secret-key
NODE_ENV=development

# .env (Frontend)
VITE_API_URL=http://localhost:5000/api
```

**Frontend Configuration:**
```typescript
// src/config/api.ts
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// src/utils/api.ts
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const token = localStorage.getItem('auth_token');

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }

  return response.json();
}
```

### API Service Layer

```typescript
// src/services/productService.ts
import { apiRequest } from '../utils/api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
}

export const productService = {
  getAll: () => apiRequest<Product[]>('/products'),

  getById: (id: string) => apiRequest<Product>(`/products/${id}`),

  create: (product: Omit<Product, 'id'>) =>
    apiRequest<Product>('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    }),

  update: (id: string, product: Partial<Product>) =>
    apiRequest<Product>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    }),

  delete: (id: string) =>
    apiRequest<void>(`/products/${id}`, { method: 'DELETE' }),
};

// Usage in component
import { useEffect, useState } from 'react';
import { productService, Product } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    productService.getAll()
      .then(setProducts)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### React Query Integration

```bash
npm install @tanstack/react-query
```

```typescript
// src/main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

// src/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService, Product } from '../services/productService';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productService.getById(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
}

// Component usage
function ProductList() {
  const { data: products, isLoading, error } = useProducts();
  const deleteProduct = useDeleteProduct();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>
          {product.name}
          <button onClick={() => deleteProduct.mutate(product.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
```

---

## 4. Real-Time Features

### WebSocket with Socket.io

**Backend Setup:**
```bash
npm install socket.io
```

```typescript
// server/index.ts
import { Server } from 'socket.io';
import { createServer } from 'http';

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: 'http://localhost:5173', credentials: true },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server with WebSocket on port ${PORT}`);
});
```

**Frontend Integration:**
```bash
npm install socket.io-client
```

```typescript
// src/services/socket.ts
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

export const socket: Socket = io(SOCKET_URL, {
  autoConnect: false,
});

export function connectSocket() {
  if (!socket.connected) {
    socket.connect();
  }
}

export function disconnectSocket() {
  if (socket.connected) {
    socket.disconnect();
  }
}

// src/components/Chat.tsx
import { useState, useEffect } from 'react';
import { socket, connectSocket, disconnectSocket } from '../services/socket';

function Chat({ room }: { room: string }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    connectSocket();
    socket.emit('join_room', room);

    socket.on('receive_message', (data) => {
      setMessages(prev => [...prev, data.message]);
    });

    return () => {
      disconnectSocket();
    };
  }, [room]);

  const sendMessage = () => {
    socket.emit('send_message', { room, message: input });
    setMessages(prev => [...prev, input]);
    setInput('');
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
```

### Server-Sent Events (SSE)

**Backend:**
```typescript
// server/routes/notifications.ts
router.get('/stream', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendNotification = (data: any) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Send notification every 5 seconds
  const interval = setInterval(() => {
    sendNotification({ message: 'New notification', timestamp: Date.now() });
  }, 5000);

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
});
```

**Frontend:**
```typescript
// src/hooks/useNotifications.ts
import { useState, useEffect } from 'react';

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:5000/api/notifications/stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setNotifications(prev => [...prev, data]);
    };

    return () => eventSource.close();
  }, []);

  return notifications;
}
```

---

## 5. Performance Optimization

### Code Splitting

```typescript
// Lazy loading routes
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

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
```

### Caching Strategies

```typescript
// React Query cache configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Service Worker for offline caching
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/static/css/main.css',
        '/static/js/main.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
```

### Backend Performance

```typescript
// Compression
import compression from 'compression';
app.use(compression());

// Rate limiting
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
});

app.use('/api/', limiter);

// Database indexing (MongoDB)
productSchema.index({ name: 1 });
productSchema.index({ category: 1, price: -1 });

// Query optimization
const products = await Product.find({ category: 'Electronics' })
  .select('name price') // Only fetch needed fields
  .limit(20)
  .lean(); // Return plain objects, not Mongoose documents
```

---

## 6. Deployment

### Production Build

**Frontend Build:**
```bash
npm run build
```

**Optimized Vite Configuration:**
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@tanstack/react-query'],
        },
      },
    },
  },
});
```

### Environment Configuration

```typescript
// .env.production (Frontend)
VITE_API_URL=https://api.yourapp.com

// .env.production (Backend)
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
JWT_SECRET=prod-secret-key-change-this
```

### Docker Deployment

**Dockerfile (Frontend):**
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Dockerfile (Backend):**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/index.js"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://backend:5000

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - mongodb
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/myapp
      - JWT_SECRET=${JWT_SECRET}

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Cloud Deployment (Vercel + Railway)

**Vercel (Frontend):**
```bash
npm install -g vercel
vercel login
vercel --prod
```

**vercel.json:**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "VITE_API_URL": "https://your-backend.railway.app"
  }
}
```

**Railway (Backend):**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### Monitoring and Logging

```typescript
// Backend logging with Winston
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Usage
logger.info('Server started on port 5000');
logger.error('Database connection failed', { error: err.message });
```

**Error Tracking (Sentry):**
```bash
npm install @sentry/react @sentry/node
```

```typescript
// Frontend
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});

// Backend
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

---

## 7. Security Best Practices

### CORS Configuration

```typescript
import cors from 'cors';

const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourapp.com']
    : ['http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
```

### Helmet for Security Headers

```bash
npm install helmet
```

```typescript
import helmet from 'helmet';

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'"],
    imgSrc: ["'self'", "data:", "https:"],
  },
}));
```

### Input Validation

```bash
npm install joi
```

```typescript
import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(1000).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
});

router.post('/', async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // Proceed with creation
});
```

### SQL Injection Prevention

```typescript
// ✅ Use parameterized queries (Prisma/Mongoose)
const user = await prisma.user.findFirst({
  where: { email: userEmail } // Safe: parameterized
});

// ❌ Never concatenate SQL strings
const query = `SELECT * FROM users WHERE email = '${userEmail}'`; // Dangerous!
```

---

## Summary

**Full-Stack Architecture:**
- MERN/PERN stack for complete web applications
- RESTful API design with Express.js
- Database integration (MongoDB/PostgreSQL)
- Frontend-backend communication via HTTP/WebSocket

**Backend Development:**
- Express.js for routing and middleware
- MongoDB with Mongoose or PostgreSQL with Prisma
- JWT authentication and authorization
- Error handling and validation
- Middleware for logging, auth, rate limiting

**Frontend Integration:**
- Environment variable configuration
- API service layer for organized requests
- React Query for server state management
- WebSocket/SSE for real-time features

**Performance Optimization:**
- Code splitting and lazy loading
- Caching strategies (React Query, Service Workers)
- Backend compression and rate limiting
- Database indexing and query optimization

**Deployment:**
- Production builds with optimization
- Docker containerization
- Cloud platforms (Vercel, Railway, AWS)
- Environment variable management
- Monitoring with logging and error tracking

**Security:**
- CORS configuration for cross-origin requests
- Helmet for security headers
- Input validation with Joi
- SQL injection prevention
- HTTPS in production
- Rate limiting and authentication
