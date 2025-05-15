const express = require('express');
const router = express.Router();
const { getalltask, addTasks, removetask, updatetasks } = require('../controllers/taskController');

// GET /tasks - Retrieve all tasks
router.get('/', getalltask);

// POST /tasks - Add a new task
router.post('/', addTasks);

// DELETE /tasks/:id - Remove a task
router.delete('/:id', removetask);

// PATCH /tasks/:id - Update a task
router.patch('/:id', updatetasks);

module.exports = router; 