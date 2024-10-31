const chatModel=require("../models/chatModel")


// Add a new chat 

const sendMessage=async (req, res) => {
    try {
        const {message}=req.body
        const newChat=new chatModel({
            message
        })
        await newChat.save()
        res.send({message:"Created Chat Successfully",status:200})
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

// Get all chats 

    const getAllChats=async (req, res) => {
    try {
        const chats=await chatModel.find()
        res.send({chats,status:200})
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

// Update a chat 

    const updateChat=async (req, res) => {
    try {
        const {chatId}=req.params
        const {message}=req.body
        const updatedChat=await chatModel.findByIdAndUpdate(chatId, {message}, {new:true})
        if(!updatedChat) return res.status(404).send({message:"Chat not found"})
        res.send({message:"Updated Chat Successfully",status:200})
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

// Delete a chat 

   const deleteChat = async (req, res) => {
    try {
        const {chatId}=req.params
        const deletedChat=await chatModel.findByIdAndDelete(chatId)
        if(!deletedChat) return res.status(404).send({message:"Chat not found"})
        res.send({message:"Deleted Chat Successfully",status:200})
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
   }

   module.exports={sendMessage,getAllChats,updateChat,deleteChat}