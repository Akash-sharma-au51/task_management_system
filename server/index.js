const express = require('express')
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRoutes")
const taskRoute = require("./routes/tasksRoutes")
const connecttoDb = require('./db.config')
dotenv.config()

const port = process.env.PORT ||8000


const app = express()

//middlewares
app.use(express.json())
app.use("/api/users",userRoutes)
app.use("/api/tasks",taskRoute)


//connection established

connecttoDb().then(()=>{
    app.listen(port,()=>{
        console.log(`app is running on ${port}`)
    })
}).catch(()=>{
    console.error("connection failed");
    
})

