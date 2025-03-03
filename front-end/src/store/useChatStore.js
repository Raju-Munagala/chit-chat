import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        try {
            set({isUsersLoading:true})
            const res = await axiosInstance.get("/message/users")
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.mesage)
        }finally{
            set({isUsersLoading:false})
        }
    },

    getMessages:async()=>{
        const {selectedUser} = get()
        try {
            set({isMessagesLoading:true})
            const res = await axiosInstance.get(`/message/${selectedUser._id}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
    },

    setSelectedUser:async(selectedUser)=>set({selectedUser}),

    sendMessage:async (data)=>{
        const {selectedUser,messages} = get()
        try {
            if(!selectedUser) return toast.error("select an user")
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,data)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    loggingOut:()=>{
        set({messages:[],
            users:[],
            selectedUser:null,})
    }
}))