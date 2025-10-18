# React Router Flow Diagram

## Overview

This diagram illustrates how React Router handles navigation and routing in a React application, showing the flow from user interaction to component rendering.

## Router Flow

```mermaid
graph TB
    subgraph "User Interaction"
        A[User clicks link] --> B[Navigate to URL]
        B --> C[URL changes]
    end
    
    subgraph "Router Processing"
        C --> D[BrowserRouter detects change]
        D --> E[Routes component matches path]
        E --> F[Route component renders]
    end
    
    subgraph "Component Rendering"
        F --> G[Target component mounts]
        G --> H[Component state initializes]
        H --> I[Component renders UI]
    end
    
    subgraph "Navigation Methods"
        J[Link component] --> K[Programmatic navigation]
        K --> L[useNavigate hook]
        L --> M[History API]
    end
    
    A --> J
    J --> D
```

## Route Structure

```mermaid
graph TD
    A[App] --> B[BrowserRouter]
    B --> C[Routes]
    C --> D[Route: /]
    C --> E[Route: /about]
    C --> F[Route: /contact]
    C --> G[Route: /profile]
    C --> H[Route: /login]
    
    D --> D1[Home Component]
    E --> E1[About Component]
    F --> F1[Contact Component]
    G --> G1[Profile Component]
    H --> H1[Login Component]
    
    subgraph "Nested Routes"
        I[Route: /dashboard] --> I1[Dashboard Layout]
        I1 --> I2[Route: /dashboard/settings]
        I1 --> I3[Route: /dashboard/profile]
        I2 --> I2A[Settings Component]
        I3 --> I3A[Profile Component]
    end
    
    C --> I
```

## Navigation Flow

```mermaid
sequenceDiagram
    participant U as User
    participant L as Link Component
    participant R as Router
    participant C as Component
    participant S as State
    
    U->>L: Click link
    L->>R: Navigate to URL
    R->>R: Match route
    R->>C: Render component
    C->>S: Initialize state
    S->>C: Return state
    C->>U: Display UI
```

## Route Protection Flow

```mermaid
graph TB
    subgraph "Authentication Check"
        A[User accesses protected route] --> B{Is user authenticated?}
        B -->|Yes| C[Render protected component]
        B -->|No| D[Redirect to login]
    end
    
    subgraph "Login Process"
        D --> E[Login component]
        E --> F[User submits credentials]
        F --> G[Validate credentials]
        G --> H{Valid?}
        H -->|Yes| I[Set auth state]
        H -->|No| J[Show error]
        I --> K[Redirect to original route]
        J --> E
    end
    
    subgraph "Protected Route Access"
        C --> L[Load user data]
        L --> M[Render protected content]
    end
```

## URL Structure

### Basic Routes
```
/                    # Home page
/about              # About page
/contact            # Contact page
/profile            # User profile
/login              # Login page
```

### Nested Routes
```
/dashboard          # Dashboard layout
├── /dashboard/settings    # Settings page
├── /dashboard/profile     # Profile page
└── /dashboard/analytics   # Analytics page
```

### Dynamic Routes
```
/users/:id          # User detail page
/posts/:slug        # Blog post page
/products/:category # Product category page
```

### Query Parameters
```
/search?q=react&category=tutorial
/filter?price=100&brand=nike
```

## Component Hierarchy

```mermaid
graph TD
    A[App] --> B[Layout]
    B --> C[Navigation]
    B --> D[Main Content]
    B --> E[Footer]
    
    C --> C1[Logo]
    C --> C2[Menu Items]
    C --> C3[User Menu]
    
    D --> D1[Home Page]
    D --> D2[About Page]
    D --> D3[Contact Page]
    D --> D4[Profile Page]
    
    subgraph "Protected Routes"
        F[Dashboard] --> F1[Settings]
        F --> F2[Analytics]
        F --> F3[Reports]
    end
    
    D --> F
```

## State Management

```mermaid
graph LR
    A[URL State] --> B[Router State]
    B --> C[Component State]
    C --> D[UI State]
    
    E[User Action] --> F[Navigation]
    F --> G[URL Update]
    G --> H[State Update]
    H --> I[Re-render]
```

## Key Concepts

### 1. **Declarative Routing**
- Routes defined as components
- URL-based navigation
- Automatic re-rendering on route change

### 2. **Nested Routing**
- Parent-child route relationships
- Layout components
- Nested navigation

### 3. **Route Protection**
- Authentication guards
- Role-based access
- Redirect handling

### 4. **Dynamic Routing**
- URL parameters
- Query strings
- Programmatic navigation

## Best Practices

### Route Organization
```typescript
// Route structure
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/login" element={<Login />} />
  <Route path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } />
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
</Routes>
```

### Navigation Components
```typescript
// Link component
<Link to="/about">About</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/profile');

// With state
navigate('/profile', { state: { from: 'home' } });
```

### Route Parameters
```typescript
// Access route parameters
const { id } = useParams();

// Access query parameters
const [searchParams] = useSearchParams();
const query = searchParams.get('q');
```

## Related Diagrams

- [Authentication Flow](./AUTHENTICATION_FLOW.md) - User authentication process
- [State Management Flow](./STATE_MANAGEMENT_FLOW.md) - Application state management
- [Component Lifecycle](./COMPONENT_LIFECYCLE.md) - Component behavior
