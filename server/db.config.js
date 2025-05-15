const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGO_URI;


const connecttoDb = async()=>{
    try {
        await mongoose.connect(uri,{
            usenewURLparser:true,
            usecreateindex:true
        })
        
    } catch (error) {
        console.error("error occured in connecting db ")
        
    }
}
module.exports = connecttoDb