import Login from './components/Login'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ProtectedRoute from './config/ProtectedRoute'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={
            <ProtectedRoute>
              {/* home page */}
            </ProtectedRoute>
          }/>
          
          <Route path='/' element={<Navigate to='/login' />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
