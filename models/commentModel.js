let mongoose= require("mongoose")
const commentSchema=new mongoose.Schema({
    commentText:{
        type:String,
        required:true 
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        
    },
    postId:
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
       }
},
{
    timestamps:true
})

const comment=mongoose.model("Comment",commentSchema)

module.exports=comment