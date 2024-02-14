const express=require("express")
const app=express()
const dbConnection=require("./db")
const cors=require("cors")
app.use(cors());
app.use(express.json())


app.use('/food', require('./routes/foodRoutes'))
app.use('/booking',require('./routes/bookingRoutes'))
app.use('/user',require("./routes/userRoutes"))
app.use('/admin',require("./routes/adminRoutes"))
app.listen(8000, () => console.log(`server is running at 8000`));