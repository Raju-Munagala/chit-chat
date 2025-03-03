import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

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

    subscribeToMessages:()=>{
        const {selectedUser} = get()
        if(!selectedUser) return

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage",(message)=>{
            if(message.senderId !== selectedUser._id) return
            set({
                messages:[...get().messages,message]
            })
        })
    },

    unsubscribeFromMessages:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage")
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
}))