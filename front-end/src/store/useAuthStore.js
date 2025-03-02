import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningup:false,
    isloggingin:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data})
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
    }
}))