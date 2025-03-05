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
    <div className="h-[90vh] flex">
      <div className={`w-full sm:w-1/4 h-full ${selectedUser?"hidden sm:block":""}`}>
        <ContactsSidebar />
      </div>
      <div className={`w-full sm:w-3/4 border-l border-gray-500 ${selectedUser?"":"hidden sm:block"}`}>
        {selectedUser?<MainChatSection/>:<HomePageWelcome/>}
      </div>
    </div>
  );
};

export default HomePage;
