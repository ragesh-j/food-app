const mongoose=require('mongoose');

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    image:{type:String,required:true},
    type:{type:String,required:true},
    price : {type : Number , required : true},
    description:{type:String,required:true},
    details:{type:String}
},{timestamps : true})

const foodModel = mongoose.model('booking' ,foodSchema)
module.exports = foodModel;