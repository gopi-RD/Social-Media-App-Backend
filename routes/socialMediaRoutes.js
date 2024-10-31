const userController=require("../controllers/userController");
const postController=require("../controllers/postController");
const commentController=require("../controllers/commentController");
const chatController=require("../controllers/chatController");
const middleware=require("../middleware/verifyJWTToken");
const express = require("express");
const routes=express.Router();

// user Routes 

routes.post("/register", userController.userRegisteration);
routes.post("/login", userController.userLogin);
routes.get("/users",middleware,userController.getAllUsers);
routes.get("/users/:userId",middleware,userController.getUser);

// post Routes 

routes.post("/posts",middleware,postController.addPost);
routes.get("/posts",middleware,postController.getAllPosts);
routes.get("/posts/:postId",middleware,postController.getPost);
routes.put("/posts/:postId",middleware,postController.updatePost);
routes.delete("/posts/:postId",middleware,postController.deletePost);

// comment Routes 
routes.post("/comments",middleware,commentController.addComment);
routes.get("/comments",middleware,commentController.getAllComments);
routes.get("/comments/:commentId",middleware,commentController.getComment);
routes.put("/comments/:commentId",middleware,commentController.updateComment);
routes.delete("/comments/:commentId",middleware,commentController.deleteComment);

// Chat Routes

routes.post("/message",middleware,chatController.sendMessage);
routes.get("/messages",middleware,chatController.getAllChats);
routes.put("/message/:chatId",middleware,chatController.updateChat);
routes.delete("/message/:chatId",middleware,chatController.deleteChat);


module.exports=routes;