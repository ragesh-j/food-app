const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    type:{type:String,required:true},
    price : {type : Number , required : true},
    description:{type:String,required:true},
    details:{type:String}
},{timestamps : true})

const bookingModel = mongoose.model('Foods' ,bookingSchema)
module.exports = bookingModel;