const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db.config');
const userRoutes = require('./Routes/userRoute');
const taskRoutes = require('./Routes/taskRoutes');


const port = process.env.PORT || 3000;
const app = express();
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}
// Middleware
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Start server

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
}
);



