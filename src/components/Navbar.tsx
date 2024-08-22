import React from "react";

const Navbar: React.FC = () => {

  const handleUserProfile = () => {
    console.log("clicked")
  }

  return (
    <nav className="w-full bg-gray-800 p-10 flex justify-between items-center">
      <div className="text-white text-2xl font-bold ml-20">
        Header
      </div>

      <div>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          onClick={handleUserProfile}
        >
          User Profile
        </button>
      </div>
    </nav>
  )
}

export default Navbar