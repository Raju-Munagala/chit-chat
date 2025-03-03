import React from "react";
import { useChatStore } from "../store/useChatStore";

const ContactsSidebar = () => {
  const {users,selectedUser,setSelectedUser}=useChatStore()
  return (
    <div className="bg-pink-200 text-gray-800 w-full h-full">
      <h2 className="text-lg font-semibold p-4 border-b-2 border-gray-500">
        Contacts
      </h2>
      <ul className="h-4/5 overflow-y-scroll">
        {users.map((user) => (
          <li
            key={user._id}
            className={`flex items-center border-b-2 border-gray-400 p-2 rounded cursor-pointer py-4 ${
              selectedUser?._id === user._id ? "bg-pink-300" : "bg-pink-200"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <img
              src={user.profilePic || "/profile-icon.png"}
              alt={`logo`}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="flex-1">
              <div className="font-semibold text-base">{user.firstName}</div>
              <div
                className={`text-sm ${
                  "offline" === "online" ? "text-green-400" : "text-gray-400"
                }`}
              >
                offline
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactsSidebar;
