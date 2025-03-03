import User from "../models/user.model.js"
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId, io } from './../lib/socket.js';

export const getUsersForSidebar = async(req,res)=>{
    try {
        const myId =await req.user._id
        const users =await User.find({_id:{$ne:myId}}).select("-password")
        res.status(200).json(users)
    } catch (error) {
        console.log("error in getUsersForSidebar route:"+error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const getMessages = async(req,res)=>{
    try {
        const myId =await req.user._id
        const {id:userToChatId} =await req.params
        const messages = await Message.find({$or:[{senderId:myId,receiverId:userToChatId},{senderId:userToChatId,receiverId:myId}]}).select("-password")
        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getMessages route:"+error.message);
        res.status(500).json({message:"internal server error"})
    }
}

export const sendMessage = async (req,res)=>{
    try {
        const {id:userToChatId} =await req.params
        const myId =await req.user._id
        const {text,image} =await req.body
        if(!text && !image) return res.status(400).json({message:"add data before sending"})
        let imageUrl;
        if(image){
            const uploadedResponse =await cloudinary.uploader.upload(image)
            imageUrl = uploadedResponse.secure_url
        }
        const message = new Message({
            senderId:myId,
            receiverId:userToChatId,
            text,
            image:imageUrl
        })
        await message.save()

        const receiverSocketId = getReceiverSocketId(userToChatId)
        console.log(receiverSocketId)
        if(receiverSocketId){
            io.to(userToChatId).emit("newMessage",message);
        }
        res.status(200).json(message)
    } catch (error) {
        console.log("error in sendMessage route:"+error.message)
    }
}