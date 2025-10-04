# Lesson 3 Demo: React + Node\.ts + MongoDB Integration

This demo shows how to integrate a React frontend with a Node\.ts/Express backend and MongoDB database.

## Setup Instructions

### Prerequisites

- Node\.ts (v18+)
- MongoDB (local installation or MongoDB Atlas)
- VS Code with React and Node\.ts extensions

### Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up MongoDB:**

   - Local: Start MongoDB service
   - Cloud: Create MongoDB Atlas cluster and get connection string

3. **Environment setup:**

   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Run the application:**

   ```bash
   # Run both frontend and backend
   npm run dev:full

   # Or run separately:
   npm run server  # Backend (Port 5000)
   npm run dev     # Frontend (Port 5173)
   ```

## Project Structure

```
demo/
├── server/                 # Node\.ts/Express backend
│   ├── index\.ts           # Server entry point
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── middleware/        # Express middleware
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── services/         # API services
│   └── utils/            # Utilities
└── package\.tson
```

## Features Demonstrated

- **Backend (Node\.ts/Express/MongoDB):**

  - RESTful API endpoints
  - MongoDB integration with Mongoose
  - CRUD operations
  - Error handling middleware
  - CORS configuration

- **Frontend (React):**
  - React Query for data fetching
  - Custom hooks for API integration
  - Loading states and error handling
  - Form handling with validation
  - Responsive UI components

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task


