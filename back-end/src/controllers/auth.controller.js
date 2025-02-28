import cloudinary from "../lib/cloudinary.js"
import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signup =async (req,res)=>{
    const {email,firstName,password}=req.body
    try {
        if(!email || !firstName || !password) return res.status(400).json({message:"fill all data"})
        if(password.length<6) return res.status(400).json({message:"password length should be more then 6"})
        const user = await User.findOne({email})
        if(user) return res.status(400).json({message:"user already exists"})
            
        
        const salt =await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        
        
        const newUser = new User({
            email,
            firstName,
            password:hashedPassword
        })

        if(newUser) {
            generateToken(newUser._id,res)
            await newUser.save()

            res.status(200).json({
                id:newUser._id,
                firstName:newUser.firstName,
                email:newUser.email,
                profilePic:newUser.profilePic,
                message:"user signup successful"
            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log("error in signup controller:"+error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const login =async (req,res)=>{
    const {email,password} = req.body
    try {
        if(!email || !password) return res.status(400).json({message:"enter valid credentials"})
        
        const user = await User.findOne({email})

        if(!user) return res.status(400).json({message:"user not exist! Please Signup"})

        const isPasswordCorrect = bcrypt.compare(password,user.password)

        if(!isPasswordCorrect) return res.status(400).json({message:"enter valid credentials"})

        generateToken(user._id,res)

        res.status(200).json({
            id:user._id,
            firstName:user.firstName,
            email:user.email,
            profilePic:user.profilePic
        })
        
    } catch (error) {
        console.log("error in login controller:"+error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const logout = (req,res)=>{
    try {
        res.cookie("jwt",'',{maxAge:0})
        res.status(200).json({message:"loggedout succussfully"})
    } catch (error) {
        console.log("error in logout controller:"+error.message)
        res.status(500).json({message:"internal server error"})
    }
}

export const updateProfile =async (req,res)=>{
    try {
        const {profilePic} =await req.body
        const userId =await req.user._id
        if(!profilePic) return res.status(400).json({message:"profile require"})
        const uploadedResponse =await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate({userId},{profilePic:uploadedResponse.secure_url},{new:true})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log("error in update profile route:"+error.message)
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in authCheck route:"+error.message);
        res.status(500).json({message:"internal server error"})
    }
}