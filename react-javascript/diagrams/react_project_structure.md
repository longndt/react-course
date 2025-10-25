# React Project Structure Diagram (JavaScript)

## Overview

This diagram illustrates the typical structure and organization of a React project using JavaScript, showing how different parts work together.

> 📁 **Related Theory** For detailed explanations of React project structure, see [React Fundamentals Theory](../../lesson1-fundamentals-setup/theory/theory1.md)

## Project Structure Flow

```mermaid
graph TB
    subgraph "React Project Structure"
        A[index.html] --> B[main.jsx]
        B --> C[App.jsx]
        C --> D[Components/]
        C --> E[Pages/]
        C --> F[Hooks/]
        C --> G[Context/]
        C --> H[Utils/]
        
        D --> D1[Button.jsx]
        D --> D2[Modal.jsx]
        D --> D3[Header.jsx]
        
        E --> E1[Home.jsx]
        E --> E2[About.jsx]
        E --> E3[Contact.jsx]
        
        F --> F1[useAuth.js]
        F --> F2[useApi.js]
        F --> F3[useLocalStorage.js]
        
        G --> G1[AuthContext.jsx]
        G --> G2[ThemeContext.jsx]
        
        H --> H1[api.js]
        H --> H2[helpers.js]
        H --> H3[constants.js]
    end
    
    subgraph "Build Process"
        I[Vite] --> J[JavaScript Compiler]
        J --> K[Bundler]
        K --> L[Output Files]
    end
    
    subgraph "Dependencies"
        M[node_modules/] --> N[React]
        M --> O[React DOM]
        M --> P[React Router]
        M --> Q[Axios]
    end
    
    B --> I
    M --> I
```

## File Organization

### Core Files
- **`index.html`**- HTML template
- **`main.tsx`**- Application entry point
- **`App.tsx`**- Root component

### Source Structure
```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   └── Header.tsx
├── pages/              # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   └── Contact.tsx
├── hooks/              # Custom hooks
│   ├── useAuth.ts
│   ├── useApi.ts
│   └── useLocalStorage.ts
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
├── utils/              # Utility functions
│   ├── api.ts
│   ├── helpers.ts
│   └── constants.ts
├── types/              # Type definitions (JSDoc)
│   └── index.ts
├── styles/             # CSS files
│   ├── App.css
│   └── index.css
└── assets/             # Static assets
    ├── images/
    └── icons/
```

## Data Flow

```mermaid
graph LR
    A[User Interaction] --> B[Component]
    B --> C[State Update]
    C --> D[Re-render]
    D --> E[UI Update]
    
    B --> F[API Call]
    F --> G[Server Response]
    G --> H[State Update]
    H --> D
```

## Component Hierarchy

```mermaid
graph TD
    A[App] --> B[Header]
    A --> C[Main Content]
    A --> D[Footer]
    
    B --> B1[Logo]
    B --> B2[Navigation]
    B --> B3[User Menu]
    
    C --> C1[Home Page]
    C --> C2[About Page]
    C --> C3[Contact Page]
    
    C1 --> C1A[Hero Section]
    C1 --> C1B[Features]
    C1 --> C1C[Testimonials]
    
    D --> D1[Copyright]
    D --> D2[Links]
    D --> D3[Social Media]
```

## Build Process

```mermaid
graph LR
    A[Source Code] --> B[TypeScript Compiler]
    B --> C[Vite Bundler]
    C --> D[Optimized Bundle]
    D --> E[Browser]
    
    F[Static Assets] --> C
    G[CSS Files] --> C
    H[HTML Template] --> C
```

## Key Concepts

### 1. **Component-Based Architecture**
- Reusable, modular components
- Clear separation of concerns
- Easy to test and maintain

### 2. **File Organization**
- Logical grouping by functionality
- Consistent naming conventions
- Clear import/export structure

### 3. **Build Process**
- TypeScript compilation
- Module bundling
- Asset optimization
- Development server

### 4. **Development Workflow**
- Hot module replacement
- Type checking
- Linting and formatting
- Testing integration

## Best Practices

### File Naming
- **Components** PascalCase (e.g., `UserProfile.tsx`)
- **Hooks** camelCase with `use` prefix (e.g., `useAuth.ts`)
- **Utils** camelCase (e.g., `apiHelpers.ts`)
- **Types** PascalCase (e.g., `UserTypes.ts`)

### Import Organization
```javascript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

// 3. Internal components
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// 4. Utils and types
import { apiClient } from '../utils/api';
// Note: In JavaScript, we don't need explicit type imports
```

### Component Structure
```javascript
// 1. Imports
// 2. Types/Interfaces
// 3. Component definition
// 4. Export
```

## Related Diagrams

- [Course Roadmap](./COURSE_ROADMAP.md) - Overall learning path
- [Component Lifecycle](./COMPONENT_LIFECYCLE.md) - Component behavior
- [Project Architecture](./PROJECT_ARCHITECTURE.md) - Full-stack architecture
