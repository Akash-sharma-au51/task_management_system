const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true, 
    maxlength:[12, 'Password must be less than 12 characters'],
    minlength:[6, 'Password must be more than 6 characters'],
  },
})
const User = mongoose.model('User', userSchema);
module.exports = User;