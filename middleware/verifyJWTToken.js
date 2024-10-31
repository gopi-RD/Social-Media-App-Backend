
const jwt =require("jsonwebtoken");
const dotEnv=require("dotenv")

dotEnv.config()


const verifyToken=async (request,response,next)=>{
    const authHeader=request.headers["authorization"]
    try{
    let jwtToken;
    if (authHeader!==undefined){
        jwtToken=authHeader.split(" ")[1] 

    }if (jwtToken===undefined){
        response.status(401).json({erro_msg:"Invalid Access Token"})
    }else{
        await jwt.verify(jwtToken,process.env.SECRET_KEY,async(error,payload)=>{
            if (error){
                response.status(401).json({erro_msg:"Invalid Access Token"})
            }else{
                request.user_id=payload.user_id
                next();
            }
        })
    }
}catch(error){

    response.status(500).json({erro_msg:"Internal server error"})
}

}

module.exports=verifyToken