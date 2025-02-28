import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const protectRoute = async (req,res,next)=>{
    try {
        const token = await req.cookies.jwt
        if(!token) return res.status(400).json({message:"user not found"})
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({message:"user not valid"})
        const user =await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(400).json({message:"user not found"})
        req.user = user
        next()
    } catch (error) {
        console.log("protect route error:"+error.message)
        res.status(500).json({message:"internal server error"})
    }
}