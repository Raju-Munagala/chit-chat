import express from "express"
import authRoutes from './routers/auth.route.js'
import messageRoute from './routers/message.route.js'
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser'
import cors from "cors"

dotenv.config()
const app = express();
const PORT = process.env.PORT

app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoutes)
app.use('/api/message',messageRoute)

app.listen(PORT,()=>{
    try {
        connectDB()
        console.log("server running... on port 5001");
    } catch (error) {
        console.log("error:"+error.message)
    }
    
})