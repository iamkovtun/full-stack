import PropTypes from 'prop-types'
import BlogItem from './BlogItem'

const BlogList = ({ blogs, onLike, onRemove }) => {
  return (
    <div className='blog-list'>
      {blogs.map(blog => (
        <BlogItem key={blog.id} blog={blog} onLike={onLike} onRemove={onRemove} />
      ))}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onLike: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default BlogList
