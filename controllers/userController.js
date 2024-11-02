const userModel=require("../models/userModel")
const bcrypt=require("bcrypt")
const jwt =require("jsonwebtoken");
const dotEnv=require("dotenv")


dotEnv.config()




// User Regsiteration 

const userRegisteration=async(request,response)=>{
    const {username,email,password}=request.body

    try{
        const userEmail= await userModel.findOne({email});
        if (userEmail){
            console.log("user alredy exists")
            return response.send({err_msg:"Email Already Exists!",status:400}); 
        }   
         if (password.length<8){
             return response.send({err_msg:"Password should be atleast 8 characters",status:400})
         }   
        
            const hashedPassword=await bcrypt.hash(password,10);
            const newUser=new userModel({
                username,
                email,
                password:hashedPassword
            })
            await newUser.save();
            response.send({message:"User Successfully Registered",status:200});
            console.log("registered")
    }catch(error){
        response.send({err_msg:`Internal server Error is ${error}`,status:500})
    }
}


// User Login 

const userLogin=async(request,response)=>{
    const {email,password}=request.body 
    try{
        const userDetails= await userModel.findOne({email})
        if (!userDetails){
           return response.send({err_msg:"Invalid User Email",status:400})
       }else{
           isPasswordMatch=await bcrypt.compare(password,userDetails.password);
           if (isPasswordMatch===true){
               const payload={userId:userDetails._id} 
               const jwtToken=await jwt.sign(payload,process.env.SECRET_KEY)
               response.send({message:"Login Successfully",jwt_token:jwtToken,status:200})
           }else{
               response.send({err_msg:"Invalid Password",status:500})
           }
           
        }
      
    }catch(error){
        response.status(500).json({error_msg:`Internal server Error is ${error}`})
    }
}



// get all users

    const getAllUsers=async(request,response)=>{
        console.log(request.user_id)
        try{
            const users=await userModel.find().populate("posts")
            response.send({users:users,status:200})
        }catch(error){
            response.send({error_msg:`Internal server Error is ${error}`,status:500})
        }
}

const getUser=async(request,response)=>{
    const {userId}=request.params 
    console.log(userId)
    try {
        const user=await userModel.findById(userId).populate("posts")
        if (!user){
            response.send({err_msg:"User Not Found",status:400})
        }
        
        response.send(user).status(200)
    } catch (error) {
        response.send({err_msg:`Internal server Error is ${error}`,status:500})
    }
}

// search users by text 

const searchUsers=async(request,response)=>{
    const {searchText}=request.query 
    console.log(searchText)
    try{
        let users;
        if (!searchText){
            users=undefined;
        }   
        users=await userModel.find({$or:[{username:{$regex:searchText, $options:"i"}},{email:{$regex:searchText, $options:"i"}}]})
       .populate("posts")
        response.send({users:users,status:200})
    }catch(error){
        response.send({error_msg:`Internal server Error is ${error}`,status:500})
    }
}

module.exports={userRegisteration,userLogin,getAllUsers,getUser,searchUsers};