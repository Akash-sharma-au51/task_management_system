const Tasks = require('../model/taskmodal');



const addTasks = async(req,res)=>{
    try {
        const{title,description} = req.body
    if (!title,!description) {
        res.status(400).json({
            message:"all feilds are required",
            success:false
        }
    )
        
    }
    const newtask = Tasks.create({
        title,
        description
    });
    (await newtask).save
    res.status(200).status(200).json({
        message:"tasks added successfully",
        success:true
    })
        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
        
    }
}

const removetask = async(req,res)=>{
    const{title,description} = req.body
    try {
        if (!title||!description) {
            res.status(400).json({
                message:"all feilds are required",
                success:false
            })

        const removedtask = Tasks.findOneAndDelete({title})
        res.status(200).json({
            message:"tasks removed successfully",
            success:true,
            task:removedtask
        })
            
        }

        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
        
    }
}

const updatetasks = async(req,res)=>{
    const{title,description} = req.body
    if (!title||!description) {
        res.status(400).json({
            message:"all feilds are required",
            success:false
        })
        const updatedtask = await Task.findOneAndUpdate({title})
        res.status(200).json({
            message:"tasks update successfully",
            success:true,
            tasks:updatedtask
        })
        
    }
}
const getalltask = async(req,res)=>{
    try {
        const alltasks = Tasks.find()
        res.status(200).json({
            message:"all tasks fetched successfully",
            success:true,
            tasks:alltasks
        })
        
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
        
    }
}

module.exports = {getalltask,addTasks,removetask,updatetasks}