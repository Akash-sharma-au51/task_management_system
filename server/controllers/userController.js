const Users = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// register

const registerUser = async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        const user = await Users.find({email})

        if(user){
            return res.status(400).json({
                success:false,
                message:"user already exist"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        const newUser = await Users.create({
            username,
            email,
            password:hashedpassword
        })
        const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })
        //register success
        return res.status(201).json({
            success:true,
            message:"user registered successfully",
            token,
            user:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email,
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
        
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"please provide email and password"
        })
    }
    try {
        const user = await Users.find({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:"invalid credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"invalid credentials"
            })
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {
            expiresIn: '24h'
        })
        //login success
        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
        
    }
}
const logoutUser = async(req,res)=>{
    try {
        res.clearCookie('token');
        return res.status(200).json({
            success:true,
            message:"user logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"server error",
            error:error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}