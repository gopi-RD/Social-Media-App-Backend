
const commentModel=require("../models/commentModel")
const postModel=require("../models/postModel")



// Add a comment 

const addComment =async (request, res) => {
    const {user_id}=request
    const {commentText,postId}=request.body
    try {
        const post=await postModel.findById(postId)
        const newComment=new commentModel({
            commentText,
            userId:user_id,
            postId
        })
        const savedComment= await newComment.save()
        post.postId.push(savedComment)
        await post.save()
        res.send({message:"Comment Added Successfully",status:200})
    } catch (error) {
        res.send({err_msg:`Comment Added Error: ${error}`,status:500})
    }
}

// Get all comments 

    const getAllComments =async (req, res) => {
    try {
        const allComments=await commentModel.find().populate({
            path: 'postId',          // Populate commentId array
            populate: {
              path: 'comments',  
            }
          }).populate('userId', 'username email')
        res.send({message:allComments,status:200})
    } catch (error) {
        res.send({err_msg:`Comments Fetch Error: ${error}`,status:500})
    }
}

// Get a single comment 

    const getComment = async (req, res) => {
    try {
        const {commentId}=req.params
        const singleComment=await commentModel.findById(commentId).populate("post").exec()
        if(!singleComment){
            return res.send({message:"Comment Not Found",status:404})
        }
        res.send({message:singleComment,status:200})
    } catch (error) {
        res.send({err_msg:`Comment Fetch Error: ${error}`,status:500})
    }
}

// Update a comment 

    const updateComment = async (req, res) => {
    try {
        const {commentId}=req.params
        const {commentText}=req.body
        const updatedComment=await commentModel.findByIdAndUpdate(commentId,{commentText},{new:true})
        if(!updatedComment){
            return res.send({message:"Comment Not Found",status:404})
        }
        res.send({message:"Comment Updated Successfully",status:200})
    } catch (error) {
        res.send({err_msg:`Comment Update Error: ${error}`,status:500})
    }
}

// Delete a comment 

    const deleteComment = async (req, res) => {
    try {
        const {commentId}=req.params
        const deletedComment=await commentModel.findByIdAndDelete(commentId)
        if(!deletedComment){
            return res.send({message:"Comment Not Found",status:404})
        }
        res.send({message:"Comment Deleted Successfully",status:200})
    } catch (error) {
        res.send({err_msg:`Comment Delete Error: ${error}`,status:500})
    }
}


module.exports={addComment,getAllComments,getComment,updateComment,deleteComment} 