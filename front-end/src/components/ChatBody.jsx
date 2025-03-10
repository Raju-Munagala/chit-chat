import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";


const ChatBody = () => {
  const { messages, getMessages, selectedUser,subscribeToMessages,unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null)
  
  const messageTime = (dateAndTime) => {
    const d = new Date(dateAndTime);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    getMessages();
    subscribeToMessages()
    return ()=>unsubscribeFromMessages()
  }, [selectedUser._id,subscribeToMessages,unsubscribeFromMessages,messages]);

  useEffect(()=>{
    if(messageEndRef.current && messages){
      messageEndRef.current.scrollIntoView({behavior:"smooth"});
    }
  },[messages.length])

  return (
    <div className="flex flex-col p-4 h-5/6 bg-pink-200 overflow-y-scroll">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex mb-4 ${
            authUser._id == message.senderId ? "justify-end" : "justify-start"
          }`}
          ref={messageEndRef}
        >
          <div
            className={`flex p-2 rounded ${
              authUser._id == message.senderId
                ? "bg-pink-300"
                : "bg-white text-gray-800"
            }`}
          >
            <div>
              {message.image && (
                <img
                  src={message.image}
                  alt="Attached"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
              <p className="p-1">{message.text}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1 self-end">
              {messageTime(message.updatedAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
