require('dotenv').config();
const Users = require('../models/userModal');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
            
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new Users({
                name,
                email,
                password: hashedPassword,
            });
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            newUser.token = token;
            await newUser.save();
            return res.status(201).json({ message: 'User registered successfully', token });

            
        }
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
        
    }

}
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        user.token = token;
        await user.save();
        return res.status(200).json({ message: 'User logged in successfully', token });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
const logoutUser = async (req, res) => {
   try {
    res.clearCookie('token');
    res.status(200).json({ message: 'User logged out successfully' });
    
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
    
   }
}

module.exports = {registerUser, loginUser, logoutUser};

