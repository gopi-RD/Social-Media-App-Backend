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
        ref:"User",
        required:true
    },
    likedBy:[ 
    ],
    isLiked:{
        type:Boolean,
        default:false
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