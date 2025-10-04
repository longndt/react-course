# Theory 5: Full-Stack Integration & Production Deployment

Complete guide to building, optimizing, and deploying production-ready full-stack React applications.

---

## Table of Contents

1. [Full-Stack Architecture Patterns](#1-full-stack-architecture-patterns)
2. [Backend Integration](#2-backend-integration)
3. [File Upload & Media Management](#3-file-upload--media-management)
4. [Real-Time Features](#4-real-time-features)
5. [Performance Optimization](#5-performance-optimization)
6. [Production Build Configuration](#6-production-build-configuration)
7. [Deployment Strategies](#7-deployment-strategies)
8. [Monitoring & Analytics](#8-monitoring--analytics)

---

## 1. Full-Stack Architecture Patterns

### 1.1 Monolithic vs Microservices

**Monolithic Architecture:**
```
┌─────────────────────────────────┐
│        MERN Stack App           │
├─────────────────────────────────┤
│   React Frontend                │
├─────────────────────────────────┤
│   Node.js/Express Backend       │
├─────────────────────────────────┤
│   MongoDB Database              │
└─────────────────────────────────┘
```

**Advantages:**
- Simple deployment
- Easier development and testing
- Lower latency (single server)
- Good for small to medium apps

**Disadvantages:**
- Tight coupling
- Difficult to scale
- Technology lock-in

**Microservices Architecture:**
```
┌─────────────┐    ┌──────────────┐
│   React     │    │   API        │
│  Frontend   │────│  Gateway     │
└─────────────┘    └──────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼──────┐   ┌────────▼──────┐   ┌───────▼──────┐
│ User Service │   │ Auth Service  │   │ File Service │
└──────────────┘   └───────────────┘   └──────────────┘
        │                   │                   │
┌───────▼──────┐   ┌────────▼──────┐   ┌───────▼──────┐
│  User DB     │   │   Auth DB     │   │   File DB    │
└──────────────┘   └───────────────┘   └──────────────┘
```

**Advantages:**
- Independent scaling
- Technology flexibility
- Fault isolation
- Team autonomy

**Disadvantages:**
- Complex deployment
- Network latency
- Distributed system challenges

### 1.2 When to Use Each Pattern

**Use Monolithic When:**
- Small to medium-sized applications
- Limited team size (< 10 developers)
- Tight deadlines
- Prototype or MVP stage

**Use Microservices When:**
- Large-scale applications
- Multiple teams working independently
- Different parts need to scale independently
- Need for technology diversity

---

## 2. Backend Integration

### 2.1 API Client Architecture

```typescript
// api/client.ts
class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // CRUD Operations
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }
}

// Create singleton instance
export const api = new ApiClient(import.meta.env.VITE_API_URL);
```

### 2.2 Resource-Based API Hooks

```typescript
// hooks/useApi.ts
import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions<T> {
  initialData?: T;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApi<T>(
  endpoint: string,
  options: UseApiOptions<T> = {}
) {
  const [data, setData] = useState<T | undefined>(options.initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.get<T>(endpoint);
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  return { data, loading, error, execute };
}

// Usage in components
function UserList() {
  const { data: users, loading, error, execute } = useApi<User[]>('/users');

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 2.3 Mutation Hooks

```typescript
// hooks/useMutation.ts
export function useMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setLoading(true);
      setError(null);

      try {
        const result = await mutationFn(variables);
        setData(result);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Mutation failed');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { mutate, data, loading, error, reset };
}

// Usage example
function CreateUserForm() {
  const { mutate, loading, error } = useMutation(
    (userData: CreateUserInput) => api.post('/users', userData)
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await mutate({ name, email });
      alert('User created successfully!');
    } catch (err) {
      console.error('Failed to create user:', err);
    }
  };

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>;
}
```

---

## 3. File Upload & Media Management

### 3.1 Advanced File Upload Hook

```typescript
// hooks/useFileUpload.ts
interface FileUploadOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  multiple?: boolean;
}

interface FileUploadState {
  progress: number;
  isUploading: boolean;
  error: string | null;
  uploadedUrl: string | null;
}

export function useFileUpload(
  endpoint: string,
  options: FileUploadOptions = {}
) {
  const [state, setState] = useState<FileUploadState>({
    progress: 0,
    isUploading: false,
    error: null,
    uploadedUrl: null,
  });

  const validateFile = (file: File): string | null => {
    if (options.maxSize && file.size > options.maxSize) {
      return `File size exceeds ${options.maxSize / 1024 / 1024}MB`;
    }

    if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed`;
    }

    return null;
  };

  const upload = useCallback(
    async (file: File): Promise<string> => {
      const validationError = validateFile(file);
      if (validationError) {
        setState(prev => ({ ...prev, error: validationError }));
        throw new Error(validationError);
      }

      setState(prev => ({ ...prev, isUploading: true, progress: 0, error: null }));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('timestamp', Date.now().toString());

      try {
        const xhr = new XMLHttpRequest();

        return new Promise<string>((resolve, reject) => {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentComplete = (event.loaded / event.total) * 100;
              setState(prev => ({ ...prev, progress: percentComplete }));
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              setState(prev => ({
                ...prev,
                isUploading: false,
                uploadedUrl: response.url,
                progress: 100,
              }));
              resolve(response.url);
            } else {
              reject(new Error(`Upload failed: ${xhr.statusText}`));
            }
          };

          xhr.onerror = () => {
            reject(new Error('Upload failed'));
          };

          xhr.open('POST', endpoint);
          xhr.send(formData);
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';
        setState(prev => ({ ...prev, error: errorMessage, isUploading: false }));
        throw error;
      }
    },
    [endpoint, options]
  );

  return { ...state, upload };
}
```

### 3.2 Multi-File Upload Component

```typescript
// components/MultiFileUploader.tsx
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  url?: string;
  error?: string;
}

export function MultiFileUploader({ onComplete }: { onComplete: (urls: string[]) => void }) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { upload } = useFileUpload('/api/upload', {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36),
      file,
      progress: 0,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
  });

  const uploadAll = async () => {
    const uploadPromises = files.map(async (fileItem) => {
      try {
        const url = await upload(fileItem.file);
        setFiles(prev =>
          prev.map(f =>
            f.id === fileItem.id ? { ...f, url, progress: 100 } : f
          )
        );
        return url;
      } catch (error) {
        setFiles(prev =>
          prev.map(f =>
            f.id === fileItem.id
              ? { ...f, error: error instanceof Error ? error.message : 'Failed' }
              : f
          )
        );
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    const successfulUrls = results.filter((url): url is string => url !== null);
    onComplete(successfulUrls);
  };

  return (
    <div className="multi-file-uploader">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? 'Drop files here...'
            : 'Drag & drop files, or click to select'}
        </p>
      </div>

      <div className="file-list">
        {files.map(fileItem => (
          <div key={fileItem.id} className="file-item">
            <span>{fileItem.file.name}</span>
            {fileItem.url && <span className="success">✓ Uploaded</span>}
            {fileItem.error && <span className="error">{fileItem.error}</span>}
            {fileItem.progress > 0 && fileItem.progress < 100 && (
              <progress value={fileItem.progress} max={100} />
            )}
          </div>
        ))}
      </div>

      {files.length > 0 && (
        <button onClick={uploadAll} className="btn btn-primary">
          Upload All Files
        </button>
      )}
    </div>
  );
}
```

---

## 4. Real-Time Features

### 4.1 WebSocket Integration

```typescript
// hooks/useWebSocket.ts
interface WebSocketOptions {
  reconnect?: boolean;
  reconnectInterval?: number;
  reconnectAttempts?: number;
}

interface WebSocketState<T> {
  lastMessage: T | null;
  connectionStatus: 'connecting' | 'open' | 'closed' | 'error';
  isConnected: boolean;
}

export function useWebSocket<T>(
  url: string,
  options: WebSocketOptions = {}
) {
  const {
    reconnect = true,
    reconnectInterval = 3000,
    reconnectAttempts = 5,
  } = options;

  const [state, setState] = useState<WebSocketState<T>>({
    lastMessage: null,
    connectionStatus: 'connecting',
    isConnected: false,
  });

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const reconnectCount = useRef(0);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setState(prev => ({
        ...prev,
        connectionStatus: 'open',
        isConnected: true,
      }));
      reconnectCount.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setState(prev => ({ ...prev, lastMessage: message }));
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setState(prev => ({
        ...prev,
        connectionStatus: 'closed',
        isConnected: false,
      }));

      // Attempt reconnection
      if (reconnect && reconnectCount.current < reconnectAttempts) {
        reconnectCount.current += 1;
        console.log(`Reconnecting... attempt ${reconnectCount.current}`);
        setTimeout(connect, reconnectInterval);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setState(prev => ({ ...prev, connectionStatus: 'error' }));
    };

    setSocket(ws);
  }, [url, reconnect, reconnectInterval, reconnectAttempts]);

  useEffect(() => {
    connect();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [connect]);

  const sendMessage = useCallback(
    (message: any) => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
      } else {
        console.warn('WebSocket is not connected');
      }
    },
    [socket]
  );

  return {
    ...state,
    sendMessage,
  };
}
```

### 4.2 Real-Time Chat Application

```typescript
// components/LiveChat.tsx
interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export function LiveChat({ roomId }: { roomId: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { lastMessage, sendMessage, isConnected } = useWebSocket<ChatMessage>(
    `ws://localhost:8080/chat/${roomId}`,
    { reconnect: true, reconnectAttempts: 10 }
  );

  // Add new messages to the list
  useEffect(() => {
    if (lastMessage) {
      setMessages(prev => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isConnected) return;

    const message: ChatMessage = {
      id: Math.random().toString(36),
      userId: getCurrentUserId(),
      username: getCurrentUsername(),
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    sendMessage(message);
    setNewMessage('');
  };

  return (
    <div className="live-chat">
      <div className="chat-header">
        <h3>Room: {roomId}</h3>
        <div className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>

      <div className="messages-container">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.username}:</strong> {msg.text}
            <span className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!isConnected}
        />
        <button type="submit" disabled={!isConnected || !newMessage.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
```

### 4.3 Server-Sent Events (SSE)

```typescript
// hooks/useServerSentEvents.ts
export function useServerSentEvents<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onopen = () => {
      console.log('SSE connected');
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (err) {
        console.error('Failed to parse SSE data:', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('SSE error:', err);
      setError(new Error('Connection failed'));
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, [url]);

  return { data, error, isConnected };
}

// Usage: Live progress tracking
function ProgressTracker({ jobId }: { jobId: string }) {
  const { data: progress } = useServerSentEvents<{ percent: number; status: string }>(
    `/api/jobs/${jobId}/progress`
  );

  return (
    <div>
      <h3>Job Progress</h3>
      <progress value={progress?.percent || 0} max={100} />
      <p>{progress?.status}</p>
    </div>
  );
}
```

---

## 5. Performance Optimization

### 5.1 Code Splitting Strategies

```typescript
// App.tsx - Route-based code splitting
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load route components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Suspense>
  );
}

// Component-based code splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<Spinner />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### 5.2 Memoization Techniques

```typescript
// React.memo for component memoization
interface ListItemProps {
  id: string;
  title: string;
  onClick: (id: string) => void;
}

const ListItem = memo(({ id, title, onClick }: ListItemProps) => {
  console.log(`Rendering ${title}`);
  return (
    <li onClick={() => onClick(id)}>
      {title}
    </li>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.id === nextProps.id && prevProps.title === nextProps.title;
});

// useMemo for expensive calculations
function ProductList({ products }: { products: Product[] }) {
  const sortedProducts = useMemo(() => {
    console.log('Sorting products...');
    return products
      .slice()
      .sort((a, b) => b.price - a.price);
  }, [products]); // Only recalculate when products change

  const totalValue = useMemo(() => {
    return sortedProducts.reduce((sum, p) => sum + p.price, 0);
  }, [sortedProducts]);

  return (
    <div>
      <h3>Total: ${totalValue}</h3>
      <ul>
        {sortedProducts.map(p => (
          <li key={p.id}>{p.name} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}

// useCallback for stable function references
function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Without useCallback - new function on every render
  // const handleDelete = (id: string) => {
  //   setTodos(prev => prev.filter(t => t.id !== id));
  // };

  // With useCallback - stable function reference
  const handleDelete = useCallback((id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  }, []); // No dependencies = never changes

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
      ))}
    </ul>
  );
}
```

### 5.3 Bundle Size Optimization

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true }) // Analyze bundle
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk - libraries that rarely change
          vendor: ['react', 'react-dom'],

          // Router chunk
          router: ['react-router-dom'],

          // UI library chunk
          ui: ['bootstrap', '@popperjs/core'],

          // Utilities chunk
          utils: ['date-fns', 'lodash-es'],
        },
      },
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 500,
  },
});
```

### 5.4 Image Optimization

```typescript
// components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: 'lazy' | 'eager';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy'
}: OptimizedImageProps) {
  // Generate responsive image URLs (assuming image CDN)
  const srcSet = `
    ${src}?w=400 400w,
    ${src}?w=800 800w,
    ${src}?w=1200 1200w
  `;

  return (
    <picture>
      {/* WebP for modern browsers */}
      <source type="image/webp" srcSet={srcSet} />

      {/* Fallback to original format */}
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
        alt={alt}
        width={width}
        height={height}
        loading={loading}
      />
    </picture>
  );
}
```

---

## 6. Production Build Configuration

### 6.1 Environment Variables

```typescript
// .env.development
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:8080
VITE_UPLOAD_ENDPOINT=/api/upload
VITE_ANALYTICS_ID=

// .env.production
VITE_API_URL=https://api.yourapp.com
VITE_WS_URL=wss://ws.yourapp.com
VITE_UPLOAD_ENDPOINT=https://cdn.yourapp.com/upload
VITE_ANALYTICS_ID=UA-XXXXX-Y

// config.ts
export const config = {
  apiUrl: import.meta.env.VITE_API_URL,
  wsUrl: import.meta.env.VITE_WS_URL,
  uploadEndpoint: import.meta.env.VITE_UPLOAD_ENDPOINT,
  analyticsId: import.meta.env.VITE_ANALYTICS_ID,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
```

### 6.2 Build Scripts

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "build:staging": "tsc && vite build --mode staging",
    "build:production": "tsc && vite build --mode production",
    "preview": "vite preview",
    "analyze": "vite-bundle-visualizer",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 7. Deployment Strategies

### 7.1 Docker Containerization

```dockerfile
# Dockerfile - Multi-stage build for React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Enable gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # SPA routing - serve index.html for all routes
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
}
```

### 7.2 CI/CD Pipeline - GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

      - name: Lint
        run: npm run lint

      - name: Run tests
        run: npm run test

      - name: Build
        run: npm run build

  deploy-staging:
    needs: test
    if: github.ref == 'refs/heads/develop'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Staging
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          scope: ${{ secrets.VERCEL_SCOPE }}

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Deploy to Production
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_SCOPE }}
```

---

## 8. Monitoring & Analytics

### 8.1 Error Tracking with Sentry

```typescript
// monitoring/sentry.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

export function initSentry() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    integrations: [new BrowserTracing()],

    // Performance monitoring
    tracesSampleRate: 1.0,

    // Error filtering
    beforeSend(event, hint) {
      // Don't send errors in development
      if (import.meta.env.DEV) {
        console.error(hint.originalException || hint.syntheticException);
        return null;
      }
      return event;
    },
  });
}

// Custom error boundary
export const ErrorBoundary = Sentry.ErrorBoundary;
```

### 8.2 Performance Monitoring

```typescript
// hooks/usePerformance.ts
export function usePerformanceMonitoring(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);

      // Send to analytics
      if (renderTime > 100) {
        console.warn(`Slow render detected in ${componentName}`);
      }
    };
  });
}

// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function reportWebVitals() {
  getCLS(console.log);  // Cumulative Layout Shift
  getFID(console.log);  // First Input Delay
  getFCP(console.log);  // First Contentful Paint
  getLCP(console.log);  // Largest Contentful Paint
  getTTFB(console.log); // Time to First Byte
}
```

---

## Best Practices Summary

### Architecture
- ✅ Start with monolithic, migrate to microservices when needed
- ✅ Design RESTful APIs with proper status codes
- ✅ Implement proper error handling at all layers
- ✅ Use TypeScript for type safety across the stack

### Performance
- ✅ Profile before optimizing
- ✅ Use code splitting for large applications
- ✅ Implement proper memoization (memo, useMemo, useCallback)
- ✅ Optimize images and assets

### Deployment
- ✅ Automate with CI/CD pipelines
- ✅ Use environment variables for configuration
- ✅ Containerize with Docker for consistency
- ✅ Implement monitoring and error tracking

### Security
- ✅ Validate all user inputs
- ✅ Use HTTPS in production
- ✅ Implement Content Security Policy
- ✅ Keep dependencies updated

---

## Additional Resources

- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Sentry Documentation](https://docs.sentry.io/)
- [Vercel Deployment](https://vercel.com/docs)

