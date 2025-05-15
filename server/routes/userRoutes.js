const {registerUser,loginUser,logoutUser} = require("../controllers/userController")
const express = require("express");
const router = express.Router();
const {body,validationResult} = require('express-validator')


//routes

router.post('/register',[
    body('username').notEmpty().withMessage('username is required'),
    body('email').isEmail().withMessage('please provide a valid email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters')
],registerUser)
router.post('/login',[
    body('email').isEmail().withMessage('please provide a valid email'),
    body('password').isLength({min:6}).withMessage('password must be at least 6 characters')
],loginUser)
router.get('/logout',logoutUser)

module.exports = router;
