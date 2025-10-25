# Full-Stack Project Architecture Diagrams

## 1. Complete Full-Stack Architecture Overview

```mermaid
graph TB
    subgraph Client Browser
        UI[React UI<br/>Components]
        Router[React Router<br/>Navigation]
        State[State Management<br/>Context/Zustand]
        Query[React Query<br/>Data Fetching]
    end

    subgraph Frontend Build
        Vite[Vite Dev Server<br/>Port 5173]
        Build[Production Build<br/>Static Files]
    end

    subgraph Backend Server
        Express[Express.js<br/>Port 3000]
        Routes[API Routes<br/>/api/*]
        Middleware[Middleware<br/>Auth, CORS, etc.]
        Controllers[Controllers<br/>Business Logic]
    end

    subgraph Database
        MongoDB[(MongoDB<br/>Port 27017)]
        Mongoose[Mongoose ODM<br/>Models & Schemas]
    end

    subgraph External Services
        Auth[Auth Providers<br/>Google, GitHub]
        Storage[Cloud Storage<br/>Images, Files]
        Email[Email Service<br/>SendGrid, etc.]
    end

    UI --> Router
    Router --> State
    State --> Query
    Query <--> Vite

    Vite <--> Express

    Express --> Routes
    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> Mongoose
    Mongoose <--> MongoDB

    Controllers --> Auth
    Controllers --> Storage
    Controllers --> Email

    style UI fill:#e1f5e1
    style Express fill:#fff3cd
    style MongoDB fill:#cce5ff
```

---

## 2. Development Environment Architecture

```mermaid
graph LR
    Developer[Developer<br/>VS Code] --> Git[Git Repository]

    Developer --> Frontend[Frontend Dev Server<br/>localhost:5173]
    Developer --> Backend[Backend Dev Server<br/>localhost:3000]

    Frontend --> Vite[Vite<br/>Hot Module Reload]
    Backend --> Nodemon[Nodemon<br/>Auto-restart]

    Frontend <--> Proxy[Vite Proxy<br/>API calls]
    Proxy <--> Backend

    Backend <--> MongoDB[MongoDB<br/>localhost:27017]

    Developer --> Browser[Browser<br/>Dev Tools]
    Browser --> Frontend

    style Developer fill:#e1f5e1
    style Frontend fill:#cce5ff
    style Backend fill:#fff3cd
    style MongoDB fill:#d4edda
```

**vite.config.ts**
```typescript
export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
```

---

## 3. Folder Structure Architecture

```mermaid
graph TD
    Root[Project Root] --> Client[client/ - Frontend]
    Root --> Server[server/ - Backend]
    Root --> Shared[shared/ - Common Types]

    Client --> ClientSrc[src/]
    ClientSrc --> Components[components/<br/>Reusable UI]
    ClientSrc --> Pages[pages/<br/>Route components]
    ClientSrc --> Hooks[hooks/<br/>Custom hooks]
    ClientSrc --> Context[context/<br/>Global state]
    ClientSrc --> Utils[utils/<br/>Helpers]
    ClientSrc --> Types[types/<br/>TypeScript types]

    Server --> ServerSrc[src/]
    ServerSrc --> Routes[routes/<br/>API endpoints]
    ServerSrc --> Controllers[controllers/<br/>Business logic]
    ServerSrc --> Models[models/<br/>Database schemas]
    ServerSrc --> Middleware[middleware/<br/>Auth, validation]
    ServerSrc --> Config[config/<br/>Environment]

    Shared --> SharedTypes[types/<br/>Shared interfaces]

    style Client fill:#e1f5e1
    style Server fill:#fff3cd
    style Shared fill:#cce5ff
```

---

## 4. HTTP Request Flow (Detailed)

```mermaid
sequenceDiagram
    participant Browser
    participant React
    participant Vite
    participant Express
    participant Controller
    participant Model
    participant MongoDB

    Browser->>React: User clicks button
    React->>React: Event handler triggered
    React->>Vite: fetch('/api/tasks')
    Vite->>Express: Proxy to localhost:3000/api/tasks

    Express->>Express: CORS middleware
    Express->>Express: Body parser middleware
    Express->>Express: Auth middleware (verify JWT)

    Express->>Controller: Route handler
    Controller->>Model: Task.find()
    Model->>MongoDB: Query database

    MongoDB-->>Model: Return documents
    Model-->>Controller: Mongoose documents
    Controller->>Controller: Transform data
    Controller-->>Express: JSON response

    Express-->>Vite: HTTP 200 + data
    Vite-->>React: Response
    React->>React: Update state
    React->>Browser: Re-render UI
```

---

## 5. Database Schema Architecture (Task Manager Example)

```mermaid
erDiagram
    USER ||--o{ TASK : creates
    USER ||--o{ PROJECT : owns
    PROJECT ||--o{ TASK : contains
    TASK ||--o{ COMMENT : has
    USER ||--o{ COMMENT : writes

    USER {
        ObjectId _id PK
        string email UK
        string password
        string name
        string[] roles
        Date createdAt
        Date updatedAt
    }

    PROJECT {
        ObjectId _id PK
        string name
        string description
        ObjectId userId FK
        Date createdAt
    }

    TASK {
        ObjectId _id PK
        string title
        string description
        string status
        string priority
        ObjectId userId FK
        ObjectId projectId FK
        Date dueDate
        Date createdAt
        Date updatedAt
    }

    COMMENT {
        ObjectId _id PK
        string text
        ObjectId taskId FK
        ObjectId userId FK
        Date createdAt
    }
```

**Mongoose Models**
```typescript
// User Model
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  roles: { type: [String], default: ['user'] },
}, { timestamps: true });

// Task Model
const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  dueDate: Date,
}, { timestamps: true });
```

---

## 6. Component-to-Database Data Flow

```mermaid
flowchart TB
    subgraph Frontend
        Component[TaskForm Component]
        Hook[useCreateTask Hook]
        QueryClient[React Query Client]
    end

    subgraph API Layer
        Fetch[fetch POST /api/tasks]
        Headers[Headers: Auth, Content-Type]
    end

    subgraph Backend
        Route[POST /api/tasks]
        Auth[Auth Middleware]
        Validate[Validation Middleware]
        Controller[createTask Controller]
    end

    subgraph Database Layer
        Model[Task Model]
        Schema[Mongoose Schema]
        DB[(MongoDB)]
    end

    Component -->|Submit form| Hook
    Hook -->|mutate| QueryClient
    QueryClient --> Fetch
    Fetch --> Headers
    Headers --> Route

    Route --> Auth
    Auth -->|Verified| Validate
    Validate -->|Valid| Controller

    Controller --> Model
    Model --> Schema
    Schema --> DB

    DB -->|Document| Schema
    Schema -->|Object| Model
    Model -->|JSON| Controller
    Controller -->|Response| Route
    Route -->|200 + task| Headers
    Headers --> Fetch
    Fetch -->|Update cache| QueryClient
    QueryClient -->|Notify| Hook
    Hook -->|Update UI| Component

    style Component fill:#e1f5e1
    style Controller fill:#fff3cd
    style DB fill:#cce5ff
```

---

## 7. Authentication Integration Architecture

```mermaid
graph TD
    subgraph Frontend Auth
        LoginForm[Login Form]
        AuthContext[Auth Context Provider]
        ProtectedRoute[Protected Route Wrapper]
        useAuth[useAuth Hook]
    end

    subgraph API Calls
        AuthAPI[Auth API Functions]
        Interceptor[Request Interceptor<br/>Add JWT token]
    end

    subgraph Backend Auth
        AuthRoutes[/api/auth Routes]
        AuthController[Auth Controller]
        JWT[JWT Service]
        PassHash[Password Hashing]
    end

    subgraph Database
        UserModel[User Model]
        MongoDB[(MongoDB)]
    end

    LoginForm --> AuthContext
    AuthContext --> useAuth
    useAuth --> ProtectedRoute

    AuthContext --> AuthAPI
    AuthAPI --> Interceptor
    Interceptor --> AuthRoutes

    AuthRoutes --> AuthController
    AuthController --> JWT
    AuthController --> PassHash
    AuthController --> UserModel
    UserModel --> MongoDB

    JWT -.Token.-> Interceptor

    style AuthContext fill:#e1f5e1
    style AuthController fill:#fff3cd
    style MongoDB fill:#cce5ff
```

---

## 8. Error Handling Architecture

```mermaid
flowchart TD
    Request[API Request] --> Try{Try Block}

    Try -->|Success| Response[Return Response]
    Try -->|Error| Catch[Catch Block]

    Catch --> Type{Error Type?}

    Type -->|Validation| Valid[400 Bad Request<br/>Validation errors]
    Type -->|Authentication| Unauth[401 Unauthorized<br/>Invalid token]
    Type -->|Authorization| Forbid[403 Forbidden<br/>No permission]
    Type -->|Not Found| NotFound[404 Not Found<br/>Resource missing]
    Type -->|Database| DB[500 Server Error<br/>Database error]
    Type -->|Unknown| Unknown[500 Server Error<br/>Generic error]

    Valid --> Logger[Error Logger]
    Unauth --> Logger
    Forbid --> Logger
    NotFound --> Logger
    DB --> Logger
    Unknown --> Logger

    Logger --> Client[Send to Client]

    Client --> Frontend[Frontend Error Handling]
    Frontend --> Toast[Show Toast Notification]
    Frontend --> ErrorBoundary[Error Boundary]
    Frontend --> Retry[Retry Logic]

    style Response fill:#d4edda
    style Valid fill:#fff3cd
    style DB fill:#ffe1e1
```

**Backend Error Handler**
```typescript
// Global error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message, errors: err });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  res.status(500).json({
    message: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});
```

---

## 9. Production Deployment Architecture

```mermaid
graph TB
    subgraph Development
        Dev[Developer]
        Git[Git Push]
    end

    subgraph CI/CD Pipeline
        GitHub[GitHub Actions]
        Build[Build Frontend]
        Test[Run Tests]
        Docker[Build Docker Image]
    end

    subgraph Cloud Platform
        CDN[CDN - Frontend<br/>Vercel/Netlify]
        Server[Backend Server<br/>Railway/Heroku]
        DB[(MongoDB Atlas)]
    end

    subgraph Monitoring
        Logs[Logging Service]
        Analytics[Analytics]
        Errors[Error Tracking]
    end

    Dev --> Git
    Git --> GitHub

    GitHub --> Build
    Build --> Test
    Test --> Docker

    Docker --> CDN
    Docker --> Server
    Server --> DB

    CDN --> Logs
    Server --> Logs
    Server --> Analytics
    Server --> Errors

    style Dev fill:#e1f5e1
    style CDN fill:#cce5ff
    style Server fill:#fff3cd
    style DB fill:#d4edda
```

---

## 10. Environment Configuration Flow

```mermaid
graph LR
    subgraph Development
        DevEnv[.env.development]
        DevVite[Vite Dev Server]
        DevExpress[Express Dev]
        DevMongo[(MongoDB Local)]
    end

    subgraph Production
        ProdEnv[Environment Variables<br/>Cloud Platform]
        ProdCDN[Static Build<br/>CDN]
        ProdServer[Express Production]
        ProdMongo[(MongoDB Atlas)]
    end

    DevEnv --> DevVite
    DevEnv --> DevExpress
    DevExpress --> DevMongo

    ProdEnv --> ProdCDN
    ProdEnv --> ProdServer
    ProdServer --> ProdMongo

    style DevEnv fill:#fff3cd
    style ProdEnv fill:#ffe1e1
```

**Environment Variables**
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=xxx

# Backend (.env)
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
```

---

## 11. State Management Integration

```mermaid
graph TD
    subgraph Components
        PageA[Page A]
        PageB[Page B]
        ComponentC[Component C]
    end

    subgraph Local State
        UseState1[useState - Form data]
        UseState2[useState - UI state]
    end

    subgraph Global State
        AuthContext[Auth Context<br/>User, token]
        ThemeContext[Theme Context<br/>Dark/light mode]
    end

    subgraph Server State
        ReactQuery[React Query<br/>API data cache]
        Mutations[Mutations<br/>Create, Update, Delete]
    end

    subgraph Backend
        API[REST API]
        DB[(Database)]
    end

    PageA --> UseState1
    PageB --> UseState2

    PageA --> AuthContext
    PageB --> AuthContext
    ComponentC --> ThemeContext

    PageA --> ReactQuery
    PageB --> ReactQuery
    ReactQuery --> Mutations

    Mutations --> API
    API --> DB
    DB --> API
    API --> ReactQuery

    style UseState1 fill:#e1f5e1
    style AuthContext fill:#fff3cd
    style ReactQuery fill:#cce5ff
    style DB fill:#d4edda
```

---

## 12. Real-time Features Architecture (WebSocket)

```mermaid
sequenceDiagram
    participant User1
    participant React1
    participant WS1 as WebSocket Client 1
    participant Server
    participant WS2 as WebSocket Client 2
    participant React2
    participant User2

    User1->>React1: Open app
    React1->>WS1: Connect to ws://server
    WS1->>Server: WebSocket handshake
    Server-->>WS1: Connection established

    User2->>React2: Open app
    React2->>WS2: Connect to ws://server
    WS2->>Server: WebSocket handshake
    Server-->>WS2: Connection established

    User1->>React1: Send message
    React1->>WS1: Emit 'message'
    WS1->>Server: Forward message

    rect rgb(200, 255, 200)
        Note over Server: Broadcast to all clients
        Server->>WS1: New message event
        Server->>WS2: New message event
    end

    WS1->>React1: Update state
    WS2->>React2: Update state
    React1->>User1: Display message
    React2->>User2: Display message
```

---

## 13. Caching Strategy Architecture

```mermaid
graph TD
    Request[User Request] --> Check1{Browser<br/>Cache?}

    Check1 -->|Hit| Browser[Return from Browser]
    Check1 -->|Miss| Check2{React Query<br/>Cache?}

    Check2 -->|Fresh| RQ[Return from React Query]
    Check2 -->|Stale| Background[Return cached +<br/>Fetch in background]
    Check2 -->|Miss| Check3{CDN<br/>Cache?}

    Check3 -->|Hit| CDN[Return from CDN]
    Check3 -->|Miss| Check4{Server<br/>Cache?}

    Check4 -->|Hit| Redis[(Redis Cache)]
    Check4 -->|Miss| DB[(Database)]

    DB --> Store1[Store in Redis]
    Store1 --> Store2[Store in React Query]
    Store2 --> Store3[Store in Browser]

    style Browser fill:#d4edda
    style RQ fill:#d4edda
    style CDN fill:#e1f5e1
    style Redis fill:#fff3cd
```

---

## 14. Security Layers

```mermaid
graph TB
    subgraph Client Security
        HTTPS[HTTPS Only]
        CSP[Content Security Policy]
        XSS[XSS Protection]
        LocalStorage[Secure Token Storage]
    end

    subgraph Network Security
        CORS[CORS Configuration]
        RateLimit[Rate Limiting]
        Helmet[Helmet.js Headers]
    end

    subgraph API Security
        JWT[JWT Verification]
        Validation[Input Validation]
        Sanitization[Data Sanitization]
        RBAC[Role-Based Access]
    end

    subgraph Database Security
        Encryption[Data Encryption]
        PasswordHash[Password Hashing]
        Injection[SQL/NoSQL Injection Prevention]
    end

    Request[HTTP Request] --> HTTPS
    HTTPS --> CORS
    CORS --> RateLimit
    RateLimit --> Helmet
    Helmet --> JWT
    JWT --> Validation
    Validation --> Sanitization
    Sanitization --> RBAC
    RBAC --> Encryption
    Encryption --> PasswordHash
    PasswordHash --> Injection
    Injection --> DB[(Database)]

    style HTTPS fill:#d4edda
    style JWT fill:#fff3cd
    style PasswordHash fill:#cce5ff
```

---
