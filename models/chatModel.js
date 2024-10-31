const mongoose=require("mongoose")
const chatSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
    
}
,{
    timestamps:true
})

const chat= mongoose.model("Chat",chatSchema)

module.exports=chat;