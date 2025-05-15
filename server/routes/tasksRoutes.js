const express = require("express")
const {getalltask,updatetasks,removetask,addTasks} = require("../controllers/taskController")
const authmiddleware = require("../middlewares/auth")

const router = express.Router()


router.get("/getalltasks",authmiddleware,getalltask)
router.post("/addtask",authmiddleware,addTasks)
router.patch("/updatetasks:_id",authmiddleware,updatetasks)
router.delete("/deletetask:_id",authmiddleware,removetask)

module.exports = router