// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prev, current) => (prev.likes > current.likes ? prev : current), {})
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = [...new Set(authors)]
    const authorBlogCounts = uniqueAuthors.map(author => {
        return {
            author,
            blogs: authors.filter(a => a === author).length
        }
    }
    )
    return authorBlogCounts.reduce((prev, current) => (prev.blogs > current.blogs ? prev : current), {})
}

const mostLikes = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const uniqueAuthors = [...new Set(authors)]
    const authorLikes = uniqueAuthors.map(author => {
        return {
            author,
            likes: blogs.filter(blog => blog.author === author).reduce((sum, blog) => sum + blog.likes, 0)
        }
    }
    )
    return authorLikes.reduce((prev, current) => (prev.likes > current.likes ? prev : current), {})
}



module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}