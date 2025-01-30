import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


const LoginForm = ({ ShowNotification, setUser }) => {
  LoginForm.propTypes = {
    ShowNotification: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      window.localStorage.setItem('userStored', JSON.stringify(response))
      blogService.setToken(response.token)
      event.target.reset()

      ShowNotification({
        message: 'Login successful!',
        color: 'green'
      })

    } catch (error) {
      const errorMessage = error?.response?.data?.error || 'Invalid username or password'
      ShowNotification({
        message: errorMessage,
        color: 'red'
      })
    }
  }


  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
          username: <input name={'username'} value={username} onChange={e => setUsername(e.target.value)}/>
      </div>
      <div>
          password: <input name={'password'} value={password} onChange={e => setPassword(e.target.value)}/>
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm