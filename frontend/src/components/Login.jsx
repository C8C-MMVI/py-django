import { useState } from 'react'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await api.post('/api/auth/login/', { username, password })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed.')
    }
  }

  return (
    <div className="auth-root">
      <div className="auth-card">
        <h2 className="auth-title">Welcome Back</h2>
        {error && <p className="auth-error">{error}</p>}
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="auth-input" />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="auth-input" />
        <button onClick={handleSubmit} className="auth-btn">Log In</button>
        <p className="auth-link">No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}