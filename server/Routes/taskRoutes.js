const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth");
const { createTask, getTasks, updateTask, deleteTask, getallTasks } = require("../controllers/taskController");

// Task routes
router.post("/create", authMiddleware, createTask); // Create a new task
router.get("/:userId", authMiddleware, getTasks); // Get tasks for a specific user
router.put("/:id", authMiddleware, updateTask); // Update a specific task
router.delete("/:id", authMiddleware, deleteTask); // Delete a specific task
router.get("/", authMiddleware, getallTasks); // Get all tasks

module.exports = router;