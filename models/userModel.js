const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    followers:{
        type:Number,
        default:0
    },
    following:{
        type:Number,
        default:0
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]

    
}
,{
    timestamps:true
}
)

const User= mongoose.model("User",userSchema)

module.exports=User;