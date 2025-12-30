import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../style/Register.css'

const Register = () => {
    const navigate = useNavigate()
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!username || !email || !password){
            setError('All field are required')
            return
        }

        try{
            const res = await api.post('/auth/register',{
                username,
                email,
                password
            })

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('username', res.data.user.username )
            navigate('/task')
        }
        catch(err){
            setError('Invalid credentials')
        }
    }
  return (
    <>
    <div className="auth-container">
  <div className="auth-card">
    <h2>Create Account</h2>
    <p className="subtitle">Join us today! It only takes a minute.</p>

    {error && <div className="error-message">{error}</div>}

    <form onSubmit={handleSubmit} className="auth-form">
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="johndoe123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Must be 8+ characters"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        Create Account
      </button>
    </form>

    <p className="footer-text">
      Already have an account? <a href="/login">Sign in</a>
    </p>
  </div>
</div>
    </>
  )
}

export default Register