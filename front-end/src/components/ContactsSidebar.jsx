import React from 'react'

const ContactsSidebar = ({users}) => {
  return (
    <div className="bg-pink-200 text-gray-800 h-screen w-full">
      <h2 className="text-lg font-semibold mb-4 p-4">Contacts</h2>
      <ul className='h-4/5 overflow-y-scroll'>
        {users.map(user=>(
            <li key={user._id} className={`flex items-center border-b-2 border-gray-400 p-2 rounded cursor-pointer py-4 ${"selected"==="selected"?"bg-pink-300":"bg-pink-300"}`}>
            <img
                  src={user.profilePic || "/profile-icon.png"}
                  alt={`logo`}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex-1">
                  <div className="font-semibold">{user.firstName}</div>
                  <div className={`text-sm ${"offline" === "online" ? "text-green-400" : "text-red-400"}`}>
                    offline
                  </div>
                </div>
            </li>
        ))}
        
      </ul>
    </div>
  )
}

export default ContactsSidebar