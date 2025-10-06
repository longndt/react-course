# Lesson 4 Demo: React Router & Authentication

This demo shows how to implement client-side routing and JWT authentication in React applications.

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- Previous lessons completed
- VS Code with React extensions

### Installation

1. **Install dependencies:**

   ```bash
   npm install react-router-dom @tanstack/react-query axios
   ```

2. **Run the application:**
   ```bash
   npm run dev
   ```

## Features Demonstrated

- **React Router**:

  - Nested routing
  - Dynamic routes with parameters
  - Protected routes with authentication guards
  - Programmatic navigation

- **Authentication**:

  - JWT token management
  - Login/logout functionality
  - Role-based access control
  - Persistent sessions

- **Advanced Patterns**:
  - Context API for auth state
  - Custom hooks for reusable logic
  - Higher-Order Components (HOCs)
  - Compound Components pattern

## Key Components

- `AuthProvider` - Authentication context
- `ProtectedRoute` - Route guard component
- `LoginForm` - User authentication
- `UserProfile` - Protected user area
- `AdminPanel` - Role-based access

## Routes Structure

- `/` - Home page (public)
- `/login` - Login form (public)
- `/dashboard` - User dashboard (protected)
- `/profile` - User profile (protected)
- `/admin` - Admin panel (admin only)


