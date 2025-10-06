import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// GET /api/tasks - Get all tasks
router.get('/', async (req, res) => {
   try {
      const tasks = await Task.find().sort({ createdAt: -1 });
      res.json(tasks);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// GET /api/tasks/:id - Get single task
router.get('/:id', async (req, res) => {
   try {
      const task = await Task.findById(req.params.id);
      if (!task) {
         return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// POST /api/tasks - Create new task
router.post('/', async (req, res) => {
   try {
      const task = new Task(req.body);
      const savedTask = await task.save();
      res.status(201).json(savedTask);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// PUT /api/tasks/:id - Update task
router.put('/:id', async (req, res) => {
   try {
      const task = await Task.findByIdAndUpdate(
         req.params.id,
         req.body,
         { new: true, runValidators: true }
      );
      if (!task) {
         return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// DELETE /api/tasks/:id - Delete task
router.delete('/:id', async (req, res) => {
   try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
         return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

export default router;