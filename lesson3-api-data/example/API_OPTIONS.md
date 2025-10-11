# Lesson 3: API Integration Options

This lesson provides two ways to run the API integration examples:

## Option 1: Full Backend (MongoDB + Express)

**Prerequisites:**
- MongoDB installed and running
- Node.js 18+

**Setup:**
1. Install dependencies: `npm install`
2. Create `.env` file with MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/react-course-lesson3
   ```
3. Start the backend server: `npm run server`
4. In another terminal, start the frontend: `npm run dev`

**Or run both together:**
```bash
npm run dev:full
```

## Option 2: Mock API (MSW - No Database Required)

**Perfect for learners without MongoDB setup!**

**Setup:**
1. Install dependencies: `npm install`
2. Start with mock API: `npm run dev:mock`

**What happens:**
- MSW (Mock Service Worker) intercepts API calls
- Returns realistic mock data
- No database or backend server needed
- Perfect for learning React API integration patterns

## API Endpoints (Both Options)

- `GET /api/tasks` - Fetch all tasks
- `GET /api/tasks/:id` - Fetch single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## Mock Data Structure

```typescript
interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}
```

## Switching Between Options

- **Mock Mode**: `npm run dev:mock`
- **Real Backend**: `npm run dev:full`

Both options provide the same learning experience for React API integration!
