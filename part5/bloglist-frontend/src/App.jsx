import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogApp from './components/BlogApp'


const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({})



  useEffect(() => {
    const getUserStored = async() => {
      const userStored = window.localStorage.getItem('userStored')
      if (userStored) {
        const userParsed = JSON.parse(userStored)
        setUser(userParsed)
        blogService.setToken(userParsed.token)
      }
    }
    getUserStored()
  }, [])

  const ShowNotification = ({ message, color }) => {
    setNotification({ message, color })
    setTimeout(() => {
      setNotification({})
    }, 5000)
  }


  const handelLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('userStored')
    setUser('')
  }




  return (
    <div>
      <Notification message={notification.message} color={notification.color}/>
      { user? (
        <>
          <h2>blogs</h2>
          <div>
            {`${user.username} logged in `}
            <button onClick={handelLogout}>log out</button>
          </div>
          <br/>
          <BlogApp ShowNotification={ShowNotification}/>
        </>
      ) : (
        <LoginForm ShowNotification={ShowNotification} setUser={setUser}/>
      )
      }
    </div>
  )
}

export default App