import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const BlogForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()
    blogRef.current.toggleVisibility()
    onSubmit({ title, author, url }) 
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable buttonLabel={'new blog'} ref={blogRef}>
      <form onSubmit={handleSubmit}>
        <h2>Create new</h2>
        <div>
          title: <input name="title" data-testid='title' value={title} placeholder="your title" onChange={e => setTitle(e.target.value)}/>
        </div>
        <div>
          author: <input name="author" data-testid='author' value={author} placeholder="name of author" onChange={e => setAuthor(e.target.value)}/>
        </div>
        <div>
          url: <input name="url" data-testid='url' value={url} placeholder="url to source" onChange={e => setUrl(e.target.value)}/>
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default BlogForm
