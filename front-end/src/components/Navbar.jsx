import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const {authUser,logout} = useAuthStore()
  return (
    <nav className="bg-pink-300 p-4 flex justify-between items-center">
      <Link to="/"><div className="text-2xl font-bold text-gray-800">
        Chit-Chat
      </div></Link>
      <div className="space-x-4">
        {authUser ? (
          <>
            <Link to="/"><button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500">Chats</button></Link>
            <Link to="/profile"><button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500">Profile</button></Link>
            <button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500" onClick={()=>logout()}>Logout</button>
          </>
        ) : (
          null
        )}
      </div>
    </nav>
  )
}

export default Navbar