# Lesson 5 Demo: Full-Stack Deployment & Production

This demo shows a complete full-stack React application with Express.js backend, MongoDB database, and production deployment practices.

## Features

- **Frontend** React with TypeScript, authentication, dashboard
- **Backend** Express.js API with MongoDB, JWT authentication
- **Database** MongoDB with Mongoose ODM
- **Authentication** JWT-based auth with protected routes
- **Production Ready** Optimized builds, error handling, security

## Setup Instructions

### Prerequisites

- Node.js (v18+)
- MongoDB (local or MongoDB Atlas)
- Git repository
- Vercel/Netlify account (for deployment)

### Quick Start

1. **Clone and setup:**
   ```bash
   cd lesson5-fullstack-deployment/example
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp env.example .env
   # Edit .env with your MongoDB URI
   npm run dev
   ```

3. **Frontend Setup (new terminal):**
   ```bash
   cd .. # Back to example directory
   npm install
   cp env.example .env
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api
   - Health Check: http://localhost:5000/api/health

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `PUT /api/dashboard` - Update dashboard stats
- `POST /api/dashboard/activity` - Add activity
- `GET /api/dashboard/analytics` - Get analytics

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/stats/overview` - Get user statistics

## Features Demonstrated

### Backend Features
- **RESTful API** Express.js with TypeScript
- **Database** MongoDB with Mongoose ODM
- **Authentication** JWT-based with bcrypt password hashing
- **Security** Helmet, CORS, rate limiting
- **Validation** Joi schema validation
- **Error Handling** Centralized error handling middleware

### Frontend Features
- **React Hooks** useState, useEffect, useContext
- **Authentication** Login/Register with context
- **API Integration** Axios with interceptors
- **Responsive Design** Mobile-first CSS Grid
- **Loading States** Spinner components
- **Error Handling** User-friendly error messages

### Production Features
- **Code Splitting** React.lazy for performance
- **Bundle Optimization** Vite build optimization
- **Environment Variables** Secure configuration
- **TypeScript** Full type safety
- **Security Headers** Helmet.js protection

## Development Commands

### Backend
```bash
cd backend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Database Schema

### User Model
- name, email, password (hashed)
- role (user/admin), isActive
- avatar, lastLogin, timestamps

### Dashboard Model
- userId (reference to User)
- totalUsers, totalRevenue, totalOrders
- monthlyGrowth, topProducts, recentActivity

## Deployment

### Backend Deployment
- **Railway** Full-stack deployment
- **Heroku** Container deployment
- **DigitalOcean** VPS deployment

### Frontend Deployment
- **Vercel** Static site hosting
- **Netlify** JAMstack deployment
- **AWS S3** Static website hosting


