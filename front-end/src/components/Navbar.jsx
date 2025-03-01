import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

const Navbar = () => {
  const {authUser,logout} = useAuthStore()
  return (
    <nav className="bg-pink-300 p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-gray-800">
        Chit-Chat
      </div>
      <div className="space-x-4">
        {authUser ? (
          <>
            <button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500">Settings</button>
            <button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500">Profile</button>
            <button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500" onClick={()=>logout()}>Logout</button>
          </>
        ) : (
          <button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-300">Settings</button>
        )}
      </div>
    </nav>
  )
}

export default Navbar