import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE==="development"?"http://localhost:5001":"/"

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningup:false,
    isloggingin:false,
    isUpdatingProfile:false,
    socket:null,
    onlineUsers:[],

    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            console.log("error in userAuthStore:"+error.message)
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        try {
            set({isSigningup:true})
            const res = await axiosInstance.post("/auth/signup",data)
            set({authUser:res.data})
            get().connectSocket()
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally{
            set({isSigningup:false})
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            get().disconnectSocket()
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    login:async(data)=>{
        try {
            set({isloggingin:true})
            const res = await axiosInstance.post("/auth/login",data)
            set({authUser:res.data})
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isloggingin:false})
        }
    },

    updateProfile:async(data)=>{
        try {
            set({isUpdatingProfile:true})
            const res = await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
        } catch (error) {
            console.log("error in updateProfile:"+error)
            toast.error(error.response.data.message)
        } finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket:()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        socket.connect()
        set({socket:socket})

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    }
}))