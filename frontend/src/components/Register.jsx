import { useState } from 'react'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Anybody:wght@400;600;800;900&family=DM+Mono:wght@400;500&display=swap');

  .auth-root {
    font-family: 'Anybody', sans-serif;
    background: #f5f0e8;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .auth-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(15,14,12,0.07) 39px, rgba(15,14,12,0.07) 40px),
      repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(15,14,12,0.04) 39px, rgba(15,14,12,0.04) 40px);
    pointer-events: none;
    z-index: 0;
  }

  .auth-card {
    background: #fffef9;
    border: 2.5px solid #0f0e0c;
    border-radius: 4px;
    padding: 40px 36px;
    width: 100%;
    max-width: 420px;
    box-shadow: 6px 6px 0 #0f0e0c;
    position: relative;
    z-index: 1;
  }

  .auth-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #b5af9f;
    margin-bottom: 6px;
  }

  .auth-title {
    font-size: 48px;
    font-weight: 900;
    line-height: 0.9;
    color: #0f0e0c;
    letter-spacing: -0.03em;
    text-transform: uppercase;
    margin: 0 0 8px;
  }

  .auth-title-underline {
    display: block;
    height: 6px;
    background: #ff4d00;
    margin-bottom: 28px;
  }

  .auth-label {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #b5af9f;
    margin-bottom: 6px;
    display: block;
  }

  .auth-input {
    width: 100%;
    border: 2px solid #0f0e0c;
    border-radius: 3px;
    padding: 10px 14px;
    margin-bottom: 16px;
    font-family: 'Anybody', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #0f0e0c;
    background: #f5f0e8;
    box-sizing: border-box;
    outline: none;
    transition: box-shadow 0.15s, border-color 0.15s;
  }

  .auth-input::placeholder {
    color: #b5af9f;
    font-weight: 400;
  }

  .auth-input:focus {
    border-color: #ff4d00;
    box-shadow: 3px 3px 0 #ff4d00;
  }

  .auth-btn {
    width: 100%;
    background: #0f0e0c;
    color: #f5f0e8;
    border: 2px solid #0f0e0c;
    border-radius: 3px;
    padding: 13px 24px;
    font-family: 'Anybody', sans-serif;
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 3px 3px 0 #ff4d00;
    transition: background 0.12s, color 0.12s, transform 0.1s, box-shadow 0.1s;
  }

  .auth-btn:hover {
    background: #ff4d00;
    border-color: #ff4d00;
    box-shadow: 4px 4px 0 #0f0e0c;
    transform: translate(-1px, -1px);
  }

  .auth-btn:active {
    transform: translate(2px, 2px);
    box-shadow: 1px 1px 0 #0f0e0c;
  }

  .auth-error {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #ff4d00;
    background: #fff0eb;
    border: 1.5px solid #ff4d00;
    border-radius: 3px;
    padding: 8px 12px;
    margin-bottom: 16px;
  }

  .auth-link {
    font-family: 'DM Mono', monospace;
    font-size: 12px;
    color: #b5af9f;
    margin-top: 20px;
    text-align: center;
  }

  .auth-link a {
    color: #0f0e0c;
    font-weight: 500;
    text-decoration: underline;
  }
`

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    try {
      await api.post('/api/auth/register/', { username, password })
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.')
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <>
      <style>{styles}</style>
      <div className="auth-root">
        <div className="auth-card">
          <p className="auth-eyebrow">— new here</p>
          <h1 className="auth-title">Reg<span style={{ color: '#ff4d00' }}>·</span>ister</h1>
          <span className="auth-title-underline" />
          {error && <p className="auth-error">{error}</p>}
          <label className="auth-label">Username</label>
          <input
            className="auth-input"
            placeholder="Choose a username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            onKeyDown={handleKey}
          />
          <label className="auth-label">Password</label>
          <input
            className="auth-input"
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
          />
          <button onClick={handleSubmit} className="auth-btn">Create Account</button>
          <p className="auth-link">Already have an account? <Link to="/login">Log in here</Link></p>
        </div>
      </div>
    </>
  )
}