import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../style/Login.css'


const Login = () => {
    const navigate = useNavigate()
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ error, setError ] = useState('')

    const handleAdd = async (e) => {
        e.preventDefault()
        if(!email || !password){
        setError('All field are required')
        return
        }

        try{
            const res = await api.post('/auth/login', {
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
<div className="login-container">
  <div className="login-card">
    <h2>Welcome Back</h2>
    <p className="subtitle">Please enter your details to sign in.</p>

    {error && <div className="error-message">{error}</div>}

    <form onSubmit={handleAdd} className="login-form">
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
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
          placeholder="Enter your password "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="login-button">
        Sign In
      </button>
    </form>
    
    <p className="footer-text">
      Don't have an account? <a href="/register">Sign up</a>
    </p>
  </div>
</div>
    </>
  )
}

export default Login