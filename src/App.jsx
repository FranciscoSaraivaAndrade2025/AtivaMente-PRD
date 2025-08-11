import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Category from './pages/Category'
import Game from './pages/Game'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!user ? <Login /> : <Navigate to="/" />} 
      />
      <Route 
        path="/register" 
        element={!user ? <Register /> : <Navigate to="/" />} 
      />
      <Route 
        path="/" 
        element={user ? <Home /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/category/:categoryId" 
        element={user ? <Category /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/game/:categoryId/:gameId" 
        element={user ? <Game /> : <Navigate to="/login" />} 
      />
    </Routes>
  )
}

export default App