import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogItem = ({ blog, onLike, onRemove }) => {
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
          <div className='blog-details'>
            <div>
              {blog.title} {blog.author} {' '}
              <button onClick={handleClickVisible}>hide</button>
            </div>
            <div>
              {blog.url}
            </div>
            <div>
              {blog.likes} {' '}
              <button onClick={() => onLike(blog)}>like</button>
            </div>
            <div>
              {blog.user?.username}
            </div>
            <div>
              <button onClick={() => onRemove(blog)}>remove</button>
            </div>
          </div>
        ) : (
          <div>
            <span className='blog-title-author'>{blog.title} {blog.author} </span>
            <button onClick={handleClickVisible}>view</button>
          </div>
        )}
      </div>
    )
  }
  

BlogItem.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default BlogItem
