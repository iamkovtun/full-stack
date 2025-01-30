import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const useBlogs = () => {
  const [blogs, setBlogs] = useState([])

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

  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      setBlogs([...blogs, createdBlog])
    } catch (error) {
      console.error('Error creating blog:', error)
    }
  }

  const likeBlog = async (blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(blogToUpdate.id, {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      })
      setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  return { blogs, addBlog, likeBlog, removeBlog }
}

export default useBlogs
