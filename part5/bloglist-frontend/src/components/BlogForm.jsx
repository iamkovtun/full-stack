import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import PropTypes from 'prop-types'


const BlogForm = ({ ShowNotification } ) => {

  BlogForm.propTypes = {
    ShowNotification: PropTypes.func.isRequired
  }

  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogRef = useRef()


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogService.getAll()
        setBlogs(response)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }

    fetchBlogs()
  }, [])

  const user = JSON.parse(window.localStorage.getItem('userStored'))

  const handleClickLike = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate.id, {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      })
      setBlogs(blogs.map(blog =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      ))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleClickRemove = async (blog) => {
    try {
      window.confirm (`Remove blog ${blog.title} by ${blog.author}?`)
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(b =>
        b.id !== blog.id)
      )
    } catch (error) {
      console.error('Error deleteting:', error)
    }
  }

  const handleSubmitBlog = async (event) => {
    event.preventDefault()
    try {
      blogRef.current.toggleVisibility()
      const newBlog = await blogService.create({
        title,
        author,
        url,
        username: user.username
      })
      setBlogs(blogs.concat(newBlog))
      ShowNotification({
        message: `${title} by ${author} added`,
        color: 'green'
      })
      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  return (
    <div>
      <Togglable buttonLabel={'new blog'} ref={blogRef}>
        <form onSubmit={handleSubmitBlog}>
          <h2>Create new</h2>
          <div>
            title: <input name={'title'} value={title} onChange={e => setTitle(e.target.value)}/>
          </div>
          <div>
            author: <input name={'author'} value={author} onChange={e => setAuthor(e.target.value)}/>
          </div>
          <div>
            url: <input name={'url'} value={url} onChange={e => setUrl(e.target.value)}/>
          </div>
          <div>
            <button type="submit">create</button>
          </div>
        </form>
      </Togglable>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} handleClickLike={handleClickLike} handleClickRemove={handleClickRemove}/>
      ))}
    </div>
  )
}

export default BlogForm