import BlogForm from './BlogForm'
import BlogList from './BlogList'
import useBlogs from '../hooks/useBlogs'

const BlogApp = ({ ShowNotification }) => {
  const { blogs, addBlog, likeBlog, removeBlog } = useBlogs()

  const handleNewBlog = async (newBlog) => {
    await addBlog(newBlog)
    ShowNotification({ message: `${newBlog.title} by ${newBlog.author} added`, color: 'green' })
  }

  const handelDeleteBlog = async (blog) => {
    await removeBlog(blog)
    ShowNotification({ message: `${blog.title} by ${blog.author} removed`, color: 'red' })
    }

  return (
    <div>
      <BlogForm onSubmit={handleNewBlog} />
      <BlogList blogs={blogs} onLike={likeBlog} onRemove={handelDeleteBlog} />
    </div>
  )
}

export default BlogApp
