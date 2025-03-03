import React from 'react'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatBody from './ChatBody'

const MainChatSection = () => {
  return (
    <div className="flex flex-col bg-pink-200 text-gray-800 border-t border-gray-600 h-full w-full">
      <ChatHeader/>
      <ChatBody/>
      <ChatInput/>
    </div>
  )
}

export default MainChatSection