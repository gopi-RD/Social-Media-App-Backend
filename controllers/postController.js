const postModel=require("../models/postModel")
const userModel=require("../models/userModel")

// Create a new post 

const addPost = async (request, res) => {
    const {user_id}=request
    try{
        const userdata=await userModel.findById(user_id)
        const {content,imageUrl}=request.body
        const newPost=new postModel({
            content:content,
            imageUrl:imageUrl,
            userId:user_id,
        })
        const postsaved=await newPost.save() 
        userdata.posts.push(postsaved)
        await userdata.save() 
        res.status(201).json({message:"Add Post Successfully"})
    }
    catch(err){
        res.status(500).json({err_msg:err.message})
    }
}

// Get all posts 
const getAllPosts = async (req, res) => {
    try{
        const posts=await postModel.find().populate('userId', 'username email')
        .populate({
            path: 'comments',          // Populate commentId array
            populate: {
              path: 'userId',         // Populate the postedBy field within each comment
              select: 'username'        // Select only the username field for the commenter
            }
          })
        .populate("likes")

        res.status(200).json({posts})
    }
    catch(err){
        res.status(500).json({err_msg:err.message})
    }
}


// Get single post by id 

    const getPost = async (req, res) => {
    try{
        const{postId}=req.params
        const post=await postModel.findById(postId).populate('userId', 'username email')
        .populate({
            path: 'comments',          // Populate commentId array
            populate: {
              path: 'userId',         // Populate the postedBy field within each comment
              select: 'username'        // Select only the username field for the commenter
            }
          })
        .populate("likes") 
        if(!post){
            return res.status(404).json({err_msg:"Post Not Found"})
        }
        res.status(200).json({post})
    }
    catch(err){
        res.status(500).json({err_msg:err.message})
    }
}


// Update a post by id 


const updatePost = async (request, res) => {
    try{
        const {user_id}=request
        const{postId}=request.params
        const {content,imageUrl}=req.body
        const post=await postModel.findByIdAndUpdate(postId,{content,imageUrl,userId:user_id},{new:true})
        if(!post){
            return res.status(404).json({err_msg:"Post Not Found"})
        }
        res.status(200).json({message:"Post Updated Successfully"})
    }
    catch(err){
        res.status(500).json({err_msg:err.message}) 
    }
}

// Update Likes into the database

const updateLikes=async(request,res)=>{
    const{postId}=request.params
    const {user_id}=request
    console.log(user_id)
    try{
       const post= await postModel.findById(postId)
       if (post.likes.includes(user_id)===false){
         await postModel.findByIdAndUpdate(postId,{
            $push: {likes: user_id}
        },
        {new:true}
        )
    }
    else{
        await postModel.findByIdAndUpdate(postId,{
            $pull: {likes: user_id}
        },
        {new:true}
    )
    } 
    res.status(200).json({message:"Post of Likes Updated Successfully"})
        }
    catch(err){
        res.status(500).json({err_msg:err.message})
    }

}


// Delete a post by id


const deletePost = async (req, res) => {
    try{
        const{postId}=req.params
        const userdata= await userModel.findById(req.userId)
        if(!userdata){
            return res.status(404).json({err_msg:"User Not Found"})
        }
        const post=await postModel.findByIdAndDelete(postId)
        if(!post){
            return res.status(404).json({err_msg:"Post Not Found"})
        }
        res.status(200).json({message:"Post Deleted Successfully"})
    }
    catch(err){
        res.status(500).json({err_msg:err.message})
    }
}



module.exports={addPost,getAllPosts,getPost,updatePost,updateLikes,deletePost}