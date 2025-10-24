# Lab 3 - Exercise 1: Backend Solution

## 📋 Overview

Complete backend solution for the Task Manager API using **Express.js** **MongoDB** and **Mongoose**

This solution demonstrates:
- RESTful API design
- MongoDB database integration
- Mongoose schema and validation
- CRUD operations (Create, Read, Update, Delete)
- Error handling and validation
- CORS configuration
- Environment variables

---

## Project Structure

```
exercise1-backend/
├── models/
│   └── Task.js              # Mongoose Task model with schema
├── index.js                 # Main Express server with API routes
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
├── .gitignore              # Files to ignore in git
└── readme.md               # This file
```

---

## Installation & Setup

### Prerequisites
- **Node.js**(v18+)
- **MongoDB**running locally or MongoDB Atlas account

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - Enable CORS
- `dotenv` - Environment variables
- `nodemon` - Auto-restart server (dev dependency)

### Step 2: Configure Environment

Create `.env` file from template:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/taskdb
PORT=3001

# For MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskdb
```

### Step 3: Start MongoDB

**Local MongoDB:**
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

**MongoDB Atlas:**
- Create free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
- Get connection string
- Update `.env` with your connection string

### Step 4: Run the Server

**Development mode**(auto-restart on changes):
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start at: `http://localhost:3001`

---

## 🔌 API Endpoints

### Base URL: `http://localhost:3001/api/tasks`

### 1. Get All Tasks
**GET**`/api/tasks`

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "67012abc...",
      "title": "Complete Lab 3",
      "description": "Finish the backend API",
      "completed": false,
      "priority": "high",
      "dueDate": null,
      "createdAt": "2025-10-04T10:00:00.000Z",
      "updatedAt": "2025-10-04T10:00:00.000Z"
    }
  ]
}
```

### 2. Get Single Task
**GET**`/api/tasks/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "67012abc...",
    "title": "Complete Lab 3",
    "description": "Finish the backend API",
    "completed": false,
    "priority": "high"
  }
}
```

### 3. Create Task
**POST**`/api/tasks`

**Request Body:**
```json
{
  "title": "Learn React Query",
  "description": "Master data fetching with React Query",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "_id": "67012def...",
    "title": "Learn React Query",
    "description": "Master data fetching with React Query",
    "completed": false,
    "priority": "medium",
    "createdAt": "2025-10-04T11:00:00.000Z"
  }
}
```

### 4. Update Task
**PUT**`/api/tasks/:id`

**Request Body:**
```json
{
  "title": "Learn React Query (Updated)",
  "description": "Master data fetching with React Query",
  "completed": true,
  "priority": "high"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "_id": "67012def...",
    "title": "Learn React Query (Updated)",
    "completed": true,
    "priority": "high"
  }
}
```

### 5. Delete Task
**DELETE**`/api/tasks/:id`

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "data": {
    "_id": "67012def...",
    "title": "Learn React Query"
  }
}
```

---

## Testing the API

### Using cURL

**Get all tasks:**
```bash
curl http://localhost:3001/api/tasks
```

**Create a task:**
```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Test Task\",\"description\":\"Testing the API\",\"priority\":\"high\"}"
```

**Update a task:**
```bash
curl -X PUT http://localhost:3001/api/tasks/YOUR_TASK_ID \
  -H "Content-Type: application/json" \
  -d "{\"completed\":true}"
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3001/api/tasks/YOUR_TASK_ID
```

### Using Thunder Client / Postman

1. Install Thunder Client extension in VS Code
2. Create new request
3. Set method (GET, POST, PUT, DELETE)
4. Set URL: `http://localhost:3001/api/tasks`
5. For POST/PUT: Add JSON body
6. Send request

### Using VS Code REST Client

Create `test.http` file:

```http
### Get all tasks
GET http://localhost:3001/api/tasks

### Get single task
GET http://localhost:3001/api/tasks/67012abc...

### Create task
POST http://localhost:3001/api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description here",
  "priority": "medium"
}

### Update task
PUT http://localhost:3001/api/tasks/67012abc...
Content-Type: application/json

{
  "title": "Updated Task",
  "completed": true
}

### Delete task
DELETE http://localhost:3001/api/tasks/67012abc...
```

---

## Key Concepts Explained

### 1. Mongoose Schema

```javascript
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  // ... other fields
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});
```

**Benefits:**
- Type validation (String, Number, Boolean, Date)
- Required field validation
- Custom error messages
- Automatic trimming of whitespace
- Min/max length constraints
- Automatic timestamps

### 2. Error Handling

```javascript
try {
  const task = await Task.findById(id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json({ data: task });
} catch (error) {
  // Handle different error types
  if (error.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid ID format' });
  }
  res.status(500).json({ message: 'Server error' });
}
```

**Error Types:**
- `404` - Resource not found
- `400` - Bad request (validation, invalid ID)
- `500` - Server error (database, unexpected)
- `201` - Created successfully

### 3. CORS Configuration

```javascript
app.use(cors()); // Enable CORS for all routes
```

**Why CORS?**
- Allows frontend (localhost:5173) to call backend (localhost:3001)
- Without CORS: Browser blocks cross-origin requests
- Security feature that must be explicitly enabled

### 4. RESTful API Design

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/tasks` | Get all resources |
| GET | `/api/tasks/:id` | Get one resource |
| POST | `/api/tasks` | Create new resource |
| PUT | `/api/tasks/:id` | Update resource |
| DELETE | `/api/tasks/:id` | Delete resource |

**Conventions:**
- Plural nouns for collections (`/tasks` not `/task`)
- Use HTTP methods correctly (GET = read, POST = create)
- Return appropriate status codes
- Consistent response format

---

## 🐛 Common Issues & Solutions

### Issue: "MongooseServerSelectionError: connect ECONNREFUSED"

**Cause:**MongoDB is not running

**Solution:**
```bash
# Start MongoDB service
mongod

# Or check if MongoDB is running
mongo --eval "db.version()"
```

---

### Issue: "ValidationError: title: Task title is required"

**Cause:**Missing required field in request

**Solution:**Ensure POST/PUT requests include all required fields:
```json
{
  "title": "Required field",
  "description": "Also required"
}
```

---

### Issue: "CastError: Cast to ObjectId failed"

**Cause:**Invalid MongoDB ObjectId format

**Solution:**MongoDB IDs must be 24 hex characters:
- Valid: `67012abc123456789abcdef0`
- Invalid: `123`, `abc`

---

### Issue: Port 3001 already in use

**Cause:**Another process using port 3001

**Solution:**
```bash
# Windows - Find and kill process
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9

# Or change port in .env
PORT=3001
```

---

## Learning Objectives Achieved

After completing this exercise, you should understand:

 **Express.js Basics**
- Setting up Express server
- Middleware (cors, express.json)
- Route handlers (GET, POST, PUT, DELETE)
- Error handling

 **MongoDB & Mongoose**
- Connecting to MongoDB
- Defining schemas with validation
- Creating models
- CRUD operations (find, create, update, delete)
- Query methods

 **RESTful API Design**
- Resource-based URLs
- HTTP methods and status codes
- Request/response patterns
- Consistent API structure

 **Error Handling**
- Try-catch blocks
- Different error types
- Appropriate status codes
- User-friendly error messages

 **Best Practices**
- Environment variables (.env)
- Input validation
- CORS security
- Proper status codes

---

## Next Steps

1. **Test All Endpoints** Use Thunder Client or cURL to test each endpoint
2. **Add More Fields** Extend Task model with tags, assignee, etc.
3. **Add Filtering** Implement query parameters (e.g., `?completed=true`)
4. **Add Pagination** Limit results and add pagination
5. **Move to Exercise 2** Connect this API to a React frontend with React Query

---

## Additional Resources

### Official Documentation
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)

### Tutorials
- [REST API Design Best Practices](https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/)
- [MongoDB CRUD Operations](https://www.mongodb.com/docs/manual/crud/)
- [Express Error Handling](https://expressjs.com/en/guide/error-handling.html)

---

** Backend Solution Complete!**Now move on to Exercise 2 to connect this API to a React frontend with React Query.
