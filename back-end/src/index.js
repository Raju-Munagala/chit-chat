import express from "express"
import authRoutes from './routers/auth.route.js'
import messageRoute from './routers/message.route.js'
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser'
import cors from "cors"
import { app,server } from "./lib/socket.js";
import path from "path"

dotenv.config()
const PORT = process.env.PORT
const __dirname = path.resolve()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoute)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../front-end/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../front-end","dist","index.html"))
    })
}

server.listen(PORT,()=>{
    try {
        connectDB()
        console.log("server running... on port 5001");
    } catch (error) {
        console.log("error:"+error.message)
    }
    
})