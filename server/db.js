const mongoose=require('mongoose');

function connectDB(){

    mongoose.connect('mongodb+srv://vigneshmenon:7907291477@cluster0.fjhkixr.mongodb.net/?retryWrites=true&w=majority',{useUnifiedTopology: true , useNewUrlParser: true})
   

    const connection=mongoose.connection;
    connection.on('connected',()=>{
        console.log("Succesfully connected to db...")
    })
    connection.on('error',()=>{
        console.log("Failed connecting to db...")
    })
}
connectDB();
module.exports=mongoose;