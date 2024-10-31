
const express=require("express");
const app=express();
let mongoose=require("mongoose")
const dotEnv=require("dotenv");
const cors=require("cors")
const PORT= process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

dotEnv.config();

const socialMedia=require("./routes/socialMediaRoutes");

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("connected to MongoDB"))
.catch((error)=>console.log(error));

app.use("/api",socialMedia);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.get("/",async (request,response)=>{ 
    response.send("Welcome to Social Media Server")

})
