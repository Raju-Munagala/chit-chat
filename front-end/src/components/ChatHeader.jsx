import React from 'react'
import { useChatStore } from '../store/useChatStore'

const ChatHeader = () => {
  const {selectedUser} = useChatStore()
  return (
    <div className="flex items-center p-4 bg-pink-300">
      <img src={selectedUser.profilePic || "/profile-icon.png"} alt="Profile" className="w-12 h-12 rounded-full bg-red-400" />
      <div className="ml-4">
        <h2 className="text-xl font-semibold text-gray-800">{selectedUser.firstName}</h2>
        <span className={`text-sm ${false ? 'text-green-400' : 'text-gray-800'}`}>
          {false ? 'Online' : 'Offline'}
        </span>
      </div>
    </div>
  )
}

export default ChatHeader