const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany()
    await Blog.insertMany(helper.initBlogs)
})

describe('init tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initBlogs.length)
    })
})

describe('right format of response', () => {
    test ('id is correctly set', async () => {
        const response = await api.get('/api/blogs')
        assert((!!response.body[0].id))
        assert((!response.body[0]._id))
    }),
    test ('likes correctly set to zero as default', async () => {
        const token = await helper.userToken()
        const newBlog = {
            title: 'New Blog',
            author: 'Should be Zero',
            url: 'http://blog.example.com',
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
        assert.strictEqual(response.body.likes, 0)
    }),

    test ('validation of existence of title', async () => {
        const token = await helper.userToken()
        const newBlog = {
            //title: 'New Blog',
            author: 'Should be Error',
            url: 'http://blog.example.com',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDB()
        assert.strictEqual(blogsAtEnd.length, helper.initBlogs.length)
    }),

    test ('delete request check', async() => {
        const token = await helper.userToken()
        const newBlog = {
            title: 'New Blog',
            author: 'Should be Deleted',
            url: 'http://blog.example.com',
            likes: 3
        }
        const body =  await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blog = body.body
        const atBegginigblogs = await helper.blogsInDB()
        const toDeleteBlogId = blog.id
        await api
            .delete(`/api/blogs/${toDeleteBlogId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const atEndBlogs = await helper.blogsInDB()
        assert.strictEqual(atEndBlogs.length, atBegginigblogs.length-1)
    }),

    test ('put request check', async() => {
        const token = await helper.userToken()
        const newBlog = {
            title: 'New Blog',
            author: 'Should be Updated',
            url: 'http://blog.example.com',
            likes: 3
        }
        const body =  await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)

        const blog = body.body
        const atBegginigblogs = await helper.blogsInDB()
        const atBeginnigTotalLikes = atBegginigblogs.reduce((sum, blog) => sum + blog.likes, 0)
        const toUpdateBlogId = blog.id
        const toUpdateBlogLikes = blog.likes
        const randomNumber = 3233424343423
        const updationBlogObject = {
            likes: randomNumber
        }
        const response = await api
            .put(`/api/blogs/${toUpdateBlogId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updationBlogObject)
            .expect(200)

        assert.strictEqual(response.body.likes, randomNumber)
        const atEndblogs = await helper.blogsInDB()
        const atEndblogsLikes = atEndblogs.reduce((sum, b) => sum + b.likes, 0)

        assert.strictEqual(atEndblogsLikes, atBeginnigTotalLikes + randomNumber - toUpdateBlogLikes)
    }),
    test ('not authorized', async() => {
        const newBlog = {
            title: 'New Blog',
            author: 'Should be Error',
            url: 'http://blog.example.com',
            likes: 3
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)

    })


})




after(async () => {
    await mongoose.connection.close()
})

