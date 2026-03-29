import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import api from '../api'

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null)

  useEffect(() => {
    api.get('/api/auth/me/')
      .then(() => setAuth(true))
      .catch(() => setAuth(false))
  }, [])

  if (auth === null) return <p>Loading...</p>
  return auth ? children : <Navigate to="/login" replace />
}