const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    contact:{type:Number},
    password : {type:String , required: true}
     
     
})

const adminModel = mongoose.model('Admin' , userSchema)
module.exports=adminModel