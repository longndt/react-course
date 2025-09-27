# Lesson 5: Full-Stack Integration & Production Deployment

## Overview

In this lesson, you'll learn how to build complete full-stack applications by integrating React with backend services, implementing real-time features, and deploying to production. We'll cover professional deployment strategies and production-ready optimizations.

## Learning Objectives

After this lesson, you will be able to:

- Design full-stack application architectures
- Integrate React with Node.js/Express/MongoDB backends
- Implement file upload and media management systems
- Build real-time features with WebSockets and Server-Sent Events
- Optimize React applications for production performance
- Deploy full-stack applications using modern CI/CD pipelines
- Set up monitoring, logging, and error tracking
- Configure environment management for different deployment stages

## 1. Full-Stack Architecture Patterns

### Monolithic vs Microservices Architecture

```
Modern MERN Stack:
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   React     │    │   Node.js    │    │   MongoDB   │
│  Frontend   │────│   Express    │────│  Database   │
└─────────────┘    └──────────────┘    └─────────────┘
```

### Integration with Node.js/Express Backends

```javascript
// API Client Configuration for Node.js Integration
class NodeApiClient {
│              Database           │
└─────────────────────────────────┘

Modern Microservices:
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   React     │    │   API        │    │   Auth      │
│  Frontend   │────│  Gateway     │────│  Service    │
└─────────────┘    └──────────────┘    └─────────────┘
                            │
                   ┌─────────────────┐
                   │  User Service   │
                   │ File Service    │
                   │Notification Svc │
                   └─────────────────┘
```

### Integration with Node.js/Express Backends

````typescript
### Integration with Node.js/Express Backends

```javascript
// API Client Configuration for Node.js Integration
class NodeApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // CRUD Operations
  async getUsers() {
    return this.request('/api/users');
  }

  async createUser(userData) {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
}

// Usage in React Components
const apiClient = new NodeApiClient("http://localhost:5000");
````

## 🔍 **Knowledge Checkpoint 1**

Before building full-stack integrations, ensure you understand:

1. **What's the difference between monolithic and microservices architecture?**
2. **How does a React frontend communicate with a Node.js backend?**
3. **Why do we need error handling in API client classes?**
4. **What are the benefits of using environment variables for API URLs?**

_💡 Full-stack development connects frontend and backend - think of it as building a bridge between two cities!_

---

## 2. File Upload and Media Management

### Advanced File Upload with Progress Tracking

```typescript
interface FileUploadHook {
  upload: (file: File) => Promise<string>;
  progress: number;
  isUploading: boolean;
  error: string | null;
}

export function useFileUpload(endpoint: string): FileUploadHook {
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = useCallback(
    async (file: File): Promise<string> => {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", Date.now().toString());
      formData.append("originalName", file.name);

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          // Track upload progress
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const result = await response.json();
        setProgress(100);
        return result.fileUrl;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Upload failed");
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    [endpoint]
  );

  return { upload, progress, isUploading, error };
}

// Multi-file upload component
function MultiFileUploader({
  onUploadComplete,
}: {
  onUploadComplete: (urls: string[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const { upload, progress, isUploading } = useFileUpload("/api/upload");

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  }, []);

  const uploadFiles = async () => {
    const urls: string[] = [];

    for (const file of files) {
      try {
        const url = await upload(file);
        urls.push(url);
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
      }
    }

    setUploadedUrls(urls);
    onUploadComplete(urls);
  };

  return (
    <div className="upload-area">
      <FileDropzone onDrop={handleDrop} />
      <FilePreviewList files={files} />
      {files.length > 0 && (
        <button onClick={uploadFiles} disabled={isUploading}>
          {isUploading ? `Uploading... ${progress}%` : "Upload Files"}
        </button>
      )}
    </div>
  );
}
```

## 3. Real-Time Features with WebSockets

### WebSocket Integration for Live Updates

```typescript
// WebSocket hook for real-time features
export function useWebSocket<T>(url: string) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "connecting" | "open" | "closed"
  >("connecting");

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      setConnectionStatus("open");
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setLastMessage(message);
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      setConnectionStatus("closed");
      console.log("WebSocket disconnected");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = useCallback(
    (message: any) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      }
    },
    [socket]
  );

  return {
    lastMessage,
    sendMessage,
    connectionStatus,
    isConnected: connectionStatus === "open",
  };
}

// Real-time chat component
function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { lastMessage, sendMessage, isConnected } = useWebSocket<ChatMessage>(
    "ws://localhost:8080/chat"
  );

  useEffect(() => {
    if (lastMessage) {
      setMessages((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim() && isConnected) {
      sendMessage({
        text: newMessage,
        userId: getCurrentUser().id,
        timestamp: new Date().toISOString(),
      });
      setNewMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="connection-status">
        {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
      </div>

      <div className="messages">
        {messages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
      </div>

      <div className="input-area">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={!isConnected}
        />
        <button onClick={handleSendMessage} disabled={!isConnected}>
          Send
        </button>
      </div>
    </div>
  );
}
```

## 1. Performance Optimization

### Understanding React Performance

React apps can become slow due to:

1. Large bundle sizes
2. Unnecessary re-renders
3. Unoptimized images
4. Heavy computations

### Code Splitting

Break your app into smaller chunks:

```jsx
// Before - everything in one bundle
import BigComponent from "./BigComponent";

// After - split into chunks
const BigComponent = lazy(() => import("./BigComponent"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BigComponent />
    </Suspense>
  );
}
```

### Preventing Re-renders

Use React.memo for components that render often:

```jsx
// Without memo - re-renders on every parent update
function MovieCard({ title, rating }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <span>{rating}/10</span>
    </div>
  );
}

// With memo - only re-renders when props change
const MovieCard = React.memo(function MovieCard({ title, rating }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <span>{rating}/10</span>
    </div>
  );
});
```

### Optimizing Images

```jsx
// Bad - full-size image loaded
<img src="large-image.jpg" />

// Better - responsive images
<picture>
  <source
    media="(min-width: 800px)"
    srcSet="large-image.jpg"
  />
  <source
    media="(min-width: 400px)"
    srcSet="medium-image.jpg"
  />
  <img src="small-image.jpg" alt="Description" />
</picture>
```

## 2. Performance Monitoring

### Using React DevTools

```jsx
// Add component names for profiling
const Header = React.memo(function Header() {
  return <header>...</header>;
});

// Measure render times
function SlowComponent() {
  console.time("SlowComponent render");
  // ... component logic
  console.timeEnd("SlowComponent render");
  return <div>...</div>;
}
```

### Web Vitals Monitoring

```jsx
import { getCLS, getFID, getLCP } from "web-vitals";

function reportWebVitals({ name, value }) {
  console.log(`${name}: ${value}`);
  // Send to analytics
}

getCLS(reportWebVitals);
getFID(reportWebVitals);
getLCP(reportWebVitals);
```

## 3. Deployment Process

### 1. Build Configuration

```jsx
// vite.config.js
export default defineConfig({
  build: {
    // Generate source maps
    sourcemap: true,

    // Split chunks
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          // Split large dependencies
          utils: ["date-fns", "lodash"],
        },
      },
    },
  },
});
```

### 2. Environment Variables

```jsx
// .env
VITE_API_URL=https://api.example.com
VITE_GA_ID=UA-XXXXX-Y

// Usage in components
const apiUrl = import.meta.env.VITE_API_URL;
```

### 3. Deployment Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview",
    "deploy:vercel": "vercel",
    "deploy:netlify": "netlify deploy --prod"
  }
}
```

## 4. Production Deployment Strategies

### Container-Based Deployment with Docker

```dockerfile
# Frontend Dockerfile
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

```dockerfile
# Backend Dockerfile (Node.js)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

### CI/CD Pipeline with GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy Full-Stack Application

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
          node-version: "18"
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      # Deploy Frontend
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

      # Deploy Backend
      - name: Deploy to Railway
        uses: railwayapp/cli@v2
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
          command: deploy

      # Update Database
      - name: Run Database Migrations
        run: |
          npm run migrate:prod
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

### Environment Configuration Management

```typescript
// config/environment.ts
interface EnvironmentConfig {
  API_BASE_URL: string;
  DATABASE_URL: string;
  JWT_SECRET: string;
  UPLOAD_BUCKET: string;
  WEBSOCKET_URL: string;
  PAYMENT_KEY: string;
}

const environments = {
  development: {
    API_BASE_URL: "http://localhost:3000/api",
    DATABASE_URL: "postgresql://localhost:5432/dev_db",
    JWT_SECRET: "dev-secret",
    UPLOAD_BUCKET: "dev-uploads",
    WEBSOCKET_URL: "ws://localhost:8080",
    PAYMENT_KEY: "pk_test_...",
  },
  staging: {
    API_BASE_URL: "https://staging-api.yourapp.com",
    DATABASE_URL: process.env.STAGING_DATABASE_URL!,
    JWT_SECRET: process.env.STAGING_JWT_SECRET!,
    UPLOAD_BUCKET: "staging-uploads",
    WEBSOCKET_URL: "wss://staging-ws.yourapp.com",
    PAYMENT_KEY: process.env.STAGING_PAYMENT_KEY!,
  },
  production: {
    API_BASE_URL: "https://api.yourapp.com",
    DATABASE_URL: process.env.DATABASE_URL!,
    JWT_SECRET: process.env.JWT_SECRET!,
    UPLOAD_BUCKET: "prod-uploads",
    WEBSOCKET_URL: "wss://ws.yourapp.com",
    PAYMENT_KEY: process.env.PAYMENT_KEY!,
  },
};

export const config =
  environments[process.env.NODE_ENV as keyof typeof environments] ||
  environments.development;
```

### Monitoring and Analytics Setup

```typescript
// monitoring/logger.ts
import * as Sentry from "@sentry/react";

// Initialize Sentry for error tracking
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

// Custom logger
export class Logger {
  static info(message: string, extra?: any) {
    console.log(`[INFO] ${message}`, extra);
    // Send to logging service
    this.sendToService("info", message, extra);
  }

  static error(message: string, error?: Error, extra?: any) {
    console.error(`[ERROR] ${message}`, error, extra);
    Sentry.captureException(error || new Error(message), {
      extra,
      tags: {
        component: "frontend",
      },
    });
  }

  static performance(metricName: string, duration: number) {
    console.log(`[PERF] ${metricName}: ${duration}ms`);
    // Send to analytics service
    analytics.track(metricName, { duration });
  }

  private static sendToService(level: string, message: string, extra?: any) {
    // Integration with external logging service
    fetch("/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        level,
        message,
        timestamp: new Date().toISOString(),
        extra,
      }),
    });
  }
}

// Performance monitoring hook
export function usePerformanceMonitoring(componentName: string) {
  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      Logger.performance(`${componentName}_render_time`, endTime - startTime);
    };
  });
}
```

## Lab Exercises

### Exercise 1: Full-Stack Architecture Setup

1. Design application architecture diagram
2. Set up development environment with Docker
3. Configure API gateway and microservices
4. Implement service discovery
5. Set up database connections (MongoDB)

### Exercise 2: File Upload System

1. Build multi-file upload component with drag & drop
2. Implement server-side upload handling (Node.js/Express)
3. Add image processing and thumbnail generation
4. Create file management dashboard
5. Implement secure file serving with authentication

### Exercise 3: Real-Time Features

1. Set up WebSocket server (Socket.io or native WebSockets)
2. Build real-time chat system
3. Implement live notifications
4. Add real-time data synchronization
5. Create collaborative editing features

### Exercise 4: Production Deployment Pipeline

1. Set up CI/CD pipeline with GitHub Actions
2. Configure containerization with Docker
3. Deploy to cloud platform (Vercel, Netlify, or AWS)
4. Set up monitoring and logging
5. Configure automatic scaling and load balancing

### Final Project: Complete E-Learning Platform

Build a comprehensive platform with:

- User authentication and role management
- Course management with file uploads
- Real-time discussion forums
- Live streaming integration
- Payment processing
- Analytics dashboard
- Mobile-responsive design

## Project Structure

```
src/
├── components/
│   ├── LazyComponent.jsx
│   └── OptimizedList.jsx
├── hooks/
│   └── usePerformance.js
├── utils/
│   ├── monitoring.js
│   └── optimization.js
└── config/
    ├── build.js
    └── deploy.js
```

## Additional Resources

- [React Performance Guide](https://reactjs.org/docs/optimizing-performance.html)
- [Web Vitals](https://web.dev/vitals/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

## 📊 **Final Knowledge Assessment**

Complete this self-assessment to validate your full-stack development skills:

### **Full-Stack Architecture (Must Know)**

- [ ] I understand how React communicates with Node.js backends
- [ ] I can design API endpoints for CRUD operations
- [ ] I know how to handle file uploads and media management
- [ ] I can implement proper error handling across the stack

### **Real-Time Features (Good to Know)**

- [ ] I understand WebSockets for real-time communication
- [ ] I can implement live data updates in React components
- [ ] I know how to handle connection states and reconnection
- [ ] I understand when to use WebSockets vs polling

### **Production Deployment (Must Know)**

- [ ] I can build and optimize React apps for production
- [ ] I understand environment variables and configuration management
- [ ] I know how to deploy to cloud platforms (Vercel, Netlify, etc.)
- [ ] I can set up basic CI/CD pipelines

### **Performance & Monitoring (Important to Know)**

- [ ] I can identify and fix performance bottlenecks
- [ ] I know how to implement lazy loading and code splitting
- [ ] I understand how to monitor application performance
- [ ] I can set up error tracking and logging

**🎯 Goal: Check at least 12/16 items to be ready for final projects**

### **Self-Reflection Questions**

1. What's the most complex part of full-stack development for you?
2. How would you deploy a production application?
3. What monitoring and error tracking would be essential for your application?

---

## 🎓 **Course Complete!**

**Congratulations!** You've completed the Modern React Development Course. You now have the skills to:

- Build professional React applications with TypeScript
- Integrate with Node.js/Express/MongoDB backends
- Implement authentication and routing
- Deploy production-ready applications
- Follow industry best practices and patterns

**Ready for Professional Development?** You have all the tools needed to build impressive, scalable applications that will stand out in your portfolio.

**What's Next?**

- Apply these skills to your own projects
- Contribute to open source React projects
- Build and deploy your own full-stack applications
- Stay updated with the React ecosystem

## Homework

1. Optimize Your Project

   - Profile your application
   - Implement performance improvements
   - Measure improvements
   - Document optimizations

2. Set Up Deployment

   - Choose a hosting platform
   - Configure automatic deployment
   - Set up monitoring
   - Add error tracking

3. Create Documentation
   - Performance optimization guide
   - Deployment instructions
   - Monitoring setup
   - Troubleshooting guide
