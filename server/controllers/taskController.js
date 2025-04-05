const Task = require('../models/taskModal');
const User = require('../models/userModal');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const createTask = async (req, res) => {
    const { title, description, userId } = req.body;
    try {
        const task = new Task({ title, description, userId });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
}
const getTasks = async (req, res) => {
    const { userId } = req.params;
    try {
        const tasks = await Task.find({ userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
}
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        await findByIdAndUpdate(id, { title, description }, { new: true });
        const updatedTask = await Task.findById(id);
        res.status(200).json(updatedTask);
        
    } catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
        
    }

}
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
}
const getallTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
}

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getallTasks
};
