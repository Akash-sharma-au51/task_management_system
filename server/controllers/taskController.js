const Tasks = require('../model/taskmodal');

const addTasks = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Title and description are required",
                success: false
            });
        }

        const newTask = await Tasks.create({
            title,
            description,
            completed: false
        });

        res.status(201).json({
            message: "Task added successfully",
            success: true,
            task: newTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const removetask = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                message: "Task ID is required",
                success: false
            });
        }

        const removedTask = await Tasks.findByIdAndDelete(id);
        
        if (!removedTask) {
            return res.status(404).json({
                message: "Task not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Task removed successfully",
            success: true,
            task: removedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const updatetasks = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Task ID is required",
                success: false
            });
        }

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (typeof completed === 'boolean') updateData.completed = completed;

        const updatedTask = await Tasks.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            success: true,
            task: updatedTask
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

const getalltask = async (req, res) => {
    try {
        const alltasks = await Tasks.find();
        res.status(200).json({
            message: "Tasks fetched successfully",
            success: true,
            tasks: alltasks
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

module.exports = { getalltask, addTasks, removetask, updatetasks };