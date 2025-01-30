import React, { useState } from 'react'
import BlogLikeButton from './BlogLikeButton'

const Blog = ({ blog, handleClickLike, handleClickRemove }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClickVisible = () => {
    setVisible((prev)=>!prev)
  }

  return (
    <div style={blogStyle}>
      {visible ? (
        <div>
          <div>
            {blog.title} {blog.author} {' '}
            <button onClick={handleClickVisible}>hide</button>
          </div>
          <div data-testid='blog-url'>
            {blog.url}
          </div>
          <div>
            {blog.likes} {' '}
            <BlogLikeButton blog={blog} handleClickLike={handleClickLike} />
          </div>
          <div>
            {blog.user?.username}
          </div>
          <div>
            <button onClick={() => handleClickRemove(blog)}>remove</button>
          </div>
        </div>
      ) : (
        <div>
          <span data-testid='blog-title_author'>{blog.title} {blog.author} </span>
          <button onClick={handleClickVisible}>view</button>
        </div>
      )}
    </div>
  )
}

export default Blog