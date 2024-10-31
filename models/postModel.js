const mongoose=require("mongoose")
const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    userId:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
}
,{
    timestamps:true
})

const post= mongoose.model("Post",postSchema)

module.exports=post;