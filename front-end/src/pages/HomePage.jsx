import React, { useEffect } from "react";
import ContactsSidebar from "../components/ContactsSidebar";
import HomePageWelcome from "../components/HomePageWelcome";
import { useChatStore } from "../store/useChatStore";
import MainChatSection from "../components/MainChatSection";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const {getUsers,getMessages,selectedUser} = useChatStore();

  useEffect(()=>{
    getUsers()
  },[getUsers,getMessages])

  

  return (
    <div className="h-screen flex">
      <div className="w-1/4 h-full">
        <ContactsSidebar />
      </div>
      <div className="w-3/4 border-l border-gray-500">
        {selectedUser?<MainChatSection/>:<HomePageWelcome/>}
      </div>
    </div>
  );
};

export default HomePage;
