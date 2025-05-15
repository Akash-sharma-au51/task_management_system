const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory storage for tasks
let tasks = [];

// GET /tasks - Retrieve all tasks
router.get('/tasks', (req, res) => {
    res.json(tasks);
});

// POST /tasks - Add a new task
router.post('/tasks', (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    const newTask = {
        id: uuidv4(),
        title,
        status: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PATCH /tasks/:id - Update task status
router.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (typeof status !== 'boolean') {
        return res.status(400).json({ message: 'Status must be a boolean' });
    }

    const taskIndex = tasks.findIndex(task => task.id === id);
    
    if (taskIndex === -1) {
        return res.status(404).json({ message: 'Task not found' });
    }

    tasks[taskIndex] = {
        ...tasks[taskIndex],
        status
    };

    res.json(tasks[taskIndex]);
});

module.exports = router; 