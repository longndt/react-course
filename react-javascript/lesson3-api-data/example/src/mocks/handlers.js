import { http, HttpResponse } from 'msw'

// ✅ CHECKPOINT: Mock data for API responses
const mockTasks = [
  {
    _id: '1',
    title: 'Learn React',
    description: 'Complete React fundamentals course',
    completed: false,
    priority: 'high',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Build Todo App',
    description: 'Create a todo application with React',
    completed: true,
    priority: 'medium',
    createdAt: '2024-01-02T00:00:00.000Z',
    updatedAt: '2024-01-02T00:00:00.000Z'
  },
  {
    _id: '3',
    title: 'Deploy to Production',
    description: 'Deploy the application to production',
    completed: false,
    priority: 'low',
    createdAt: '2024-01-03T00:00:00.000Z',
    updatedAt: '2024-01-03T00:00:00.000Z'
  }
]

// ✅ CHECKPOINT: MSW handlers for API endpoints
export const handlers = [
  // GET /api/tasks - Fetch all tasks
  http.get('/api/tasks', () => {
    return HttpResponse.json({
      success: true,
      data: mockTasks
    })
  }),

  // GET /api/tasks/:id - Fetch single task
  http.get('/api/tasks/:id', ({ params }) => {
    const task = mockTasks.find(t => t._id === params.id)
    if (!task) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      )
    }
    return HttpResponse.json({
      success: true,
      data: task
    })
  }),

  // POST /api/tasks - Create new task
  http.post('/api/tasks', async ({ request }) => {
    const body = await request.json()
    const newTask = {
      _id: String(mockTasks.length + 1),
      ...body,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    mockTasks.push(newTask)

    return HttpResponse.json({
      success: true,
      data: newTask
    }, { status: 201 })
  }),

  // PUT /api/tasks/:id - Update task
  http.put('/api/tasks/:id', async ({ params, request }) => {
    const body = await request.json()
    const taskIndex = mockTasks.findIndex(t => t._id === params.id)

    if (taskIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      )
    }

    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      ...body,
      updatedAt: new Date().toISOString()
    }

    return HttpResponse.json({
      success: true,
      data: mockTasks[taskIndex]
    })
  }),

  // DELETE /api/tasks/:id - Delete task
  http.delete('/api/tasks/:id', ({ params }) => {
    const taskIndex = mockTasks.findIndex(t => t._id === params.id)

    if (taskIndex === -1) {
      return HttpResponse.json(
        { success: false, message: 'Task not found' },
        { status: 404 }
      )
    }

    mockTasks.splice(taskIndex, 1)

    return HttpResponse.json({
      success: true,
      message: 'Task deleted successfully'
    })
  })
]
