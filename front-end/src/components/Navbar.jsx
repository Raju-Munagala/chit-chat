import React, { useState } from 'react'
import { MdMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useAuthStore } from '../store/useAuthStore.js'
import { Link } from 'react-router-dom'
import { useChatStore } from '../store/useChatStore.js'

const Navbar = () => {
  const [navToggle,setNavToggle] = useState(false)
  const {authUser,logout} = useAuthStore()
  const {selectedUser,setSelectedUser} = useChatStore()

  const handleNavButton = ()=>{
    setNavToggle(!navToggle)
  }

  const handleContactsButton = ()=>{
    setSelectedUser(null)
    setNavToggle(!navToggle)
  }

  const handleLogout = ()=>{
    setSelectedUser(null)
    logout()
  }
  return (
    <nav className="bg-pink-300 p-4 flex flex-col sm:flex-row justify-between sm:items-center h-[10vh] relative w-full">
      <div className='flex justify-between'>
      <Link to="/"><div className={`text-2xl font-bold text-gray-800 sm:pb-0 ${navToggle?"pb-5":""}`}>
        Chit-Chat
      </div></Link>
      {authUser && <div className='sm:hidden' onClick={()=>setNavToggle(!navToggle)}>{navToggle?<RxCross2/>:<MdMenu/>}</div>}
      </div>
      <div className={`space-x-4 bg-pink-300 ${navToggle?"p-4 sm:p-0 rounded-lg":""}`}>
        {authUser ? (
          <div className={`flex flex-col sm:flex-row gap-4 ${navToggle?"":"hidden md:flex"}`}>
            <Link to="/"><button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500 w-full sm:hidden"
            onClick={handleContactsButton}>contacts</button></Link>
            <Link to="/"><button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500 w-full" onClick={handleNavButton}>Chats</button></Link>
            <Link to="/profile"><button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500 w-full" onClick={handleNavButton}>Profile</button></Link>
            <button className="bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded hover:bg-pink-500" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          null
        )}
      </div>
    </nav>
  )
}

export default Navbar