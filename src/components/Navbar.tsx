import React, { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { HEADER, USER_PROFILE, LOGOUT } from "../config/Constants"

const Navbar: React.FC = () => {

  const [dropdownVisible, setDropDownVisible] = useState(false)
  const { logout } = useAuth()

  const handleUserProfile = () => {
    setDropDownVisible(!dropdownVisible)
  }

  const handleLogout = () => {
    logout()
    setDropDownVisible(false)
  }

  return (
    <nav className="w-full bg-gray-800 p-10 flex justify-between items-center">
      <div className="text-white text-2xl font-bold ml-20">
        { HEADER }
      </div>

      <div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={handleUserProfile}
        >
          { USER_PROFILE }
        </button>

        {dropdownVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
            <button 
              className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={handleLogout}
            >
              { LOGOUT }
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar