const postModel=require("../models/postModel")
const userModel=require("../models/userModel")

// Create a new post 

const addPost = async (req, res) => {
    try{
        const {content,imageUrl,likes}=req.body
        const newPost=new postModel({content,imageUrl,likes})
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
        const posts=await postModel.find().populate("comments").populate("user")
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
        const post=await postModel.findById(postId).populate("comments").populate("user")
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


const updatePost = async (req, res) => {
    try{
        const{postId}=req.params
        const {content,imageUrl,likes}=req.body
        const post=await postModel.findByIdAndUpdate(postId,{content,imageUrl,likes},{new:true})
        if(!post){
            return res.status(404).json({err_msg:"Post Not Found"})
        }
        res.status(200).json({message:"Post Updated Successfully"})
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



module.exports={addPost,getAllPosts,getPost,updatePost,deletePost}