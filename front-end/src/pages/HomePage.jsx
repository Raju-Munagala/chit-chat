import React, { useEffect } from "react";
import ContactsSidebar from "../components/ContactsSidebar";
import HomePageWelcome from "../components/HomePageWelcome";
import { useChatStore } from "../store/useChatStore";

const HomePage = () => {
  const {users,messages,getUsers,getMessages} = useChatStore();

  useEffect(()=>{
    getUsers()
  },[getUsers,getMessages])

  return (
    <div className="h-full flex">
      <div className="w-1/4 h-full">
        <ContactsSidebar users={users}/>
      </div>
      <div className="w-3/4 border-l border-gray-500">
        <HomePageWelcome/>
      </div>
    </div>
  );
};

export default HomePage;
