import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set)=>({
    authUser:null,
    isSigningup:false,
    isloggingin:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            const res = axiosInstance.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log("error in userAuthStore:"+error.message)
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false})
        }
    }
}))