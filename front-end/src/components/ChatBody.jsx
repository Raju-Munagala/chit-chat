import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatBody = () => {
  const { messages, getMessages, selectedUser } = useChatStore();
  const { authUser } = useAuthStore();
  console.log(authUser)
  const messageTime = (dateAndTime) => {
    const d = new Date(dateAndTime);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    return `${hours}:${minutes}`;
  };
  console.log(messages);
  useEffect(() => {
    getMessages();
  }, [selectedUser]);
  return (
    <div className="flex flex-col p-4 bg-pink-200 h-4/6 overflow-y-scroll bottom-0">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex mb-4 ${
            authUser._id == message.senderId ? "justify-end" : "justify-start"
          }`}
        >
          {console.log(message.senderId,authUser._id)}
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
              <p className="p-2">{message.text}</p>
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
