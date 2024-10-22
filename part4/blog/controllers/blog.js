const router = require('express').Router()
const Blog = require('../models/blog')



router.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate({
            path: 'user',
            populate: { path: 'blogs' }
        })
        response.status(200).json(blogs)

    } catch (error) {
        next(error)
    }
})

router.post('/',async (request, response, next) => {
    try {
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'unauthorized' })
        }
        const body = request.body
        const blog = new Blog({ ...body, user: user._id })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        user.save()
        response.status(201).json(savedBlog)
    } catch (error) {
        next(error)
    }
})
router.delete('/:id', async (request, response, next) => {
    try {
        // Find the blog and check if it exists
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(404).json({ error: 'blog not found' })
        }

        // Check if user is authorized to delete blog
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'unauthorized' })
        }
        if (user._id.toString() !== blog.user.toString()) {
            return response.status(401).json({ error: 'unauthorized' })
        }

        // Remove blog from user's blogs array
        if (user) {
            user.blogs = user.blogs.filter(b => b.toString() !== request.params.id)
            await user.save()
        }

        // Delete the blog using findByIdAndDelete
        await Blog.findByIdAndDelete(request.params.id)

        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (request, response, next) => {
    try {
        // Find the blog and check if it exists
        const blog = await Blog.findById(request.params.id)
        if (!blog) {
            return response.status(404).json({ error: 'blog not found' })
        }

        // Check if user is authorized to update blog
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'unauthorized' })
        }
        if (user._id.toString() !== blog.user.toString()) {
            return response.status(401).json({ error: 'unauthorized' })
        }

        const toUpdateBlog =  {
            ...request.body
        }
        const updatedNote = await Blog.findByIdAndUpdate(request.params.id, toUpdateBlog, { new: true })
        response.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
})

module.exports = router