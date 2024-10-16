import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { USERNAME, PASSWORD, CLEAR, LOGIN } from '../config/Constants'

const Login: React.FC = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleClear = () => {
    setUsername('');
    setPassword('');
  }

  const handleLogin = () => {
    // login API
    login()
    navigate('/home')
  }
  
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0 ">
      <div className="w-full md:w-1/2 max-w-xl bg-gray-200 p-16 rounded-lg shadow-md mb-50">
        <div className="mb-5 flex justify-between">
          <label className="block text-2xl font-semibold mr-5" htmlFor="username"> { USERNAME } </label>
          <input 
            id="username" 
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-5 flex justify-between">
          <label className="block text-2xl font-semibold mr-7" htmlFor="password"> { PASSWORD } </label>
          <input 
            id="password" 
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mt-4 flex justify-between font-semibold text-sm">
          <div className="text-center md:text-left">
            <button 
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-l tracking-wider" type="submit"
              onClick={handleClear}
              >
                { CLEAR }
            </button>
          </div>
          <div className="text-center md:text-left">
            <button 
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white uppercase rounded text-l tracking-wider" type="submit"
              onClick={handleLogin}
              >
                { LOGIN }
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login