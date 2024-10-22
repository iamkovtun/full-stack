const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const initBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,

    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,

    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,

    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,

    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,

    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,

    }
]


const blogsInDB = async () => {
    const currBlogs = await Blog.find({})
    return currBlogs
}

const userInDB = async () => {
    const currUsers = await User.find({})
    return currUsers
}

const userToken = async () => {
    const newUser = {
        username: 'testuser',
        name: 'Test User',
        password: 'password123'
    }

    await User.deleteMany({})
    await api.post('/api/users').send(newUser)

    const loginResponse = await api.post('/api/login').send({
        username: newUser.username,
        password: newUser.password
    })

    return loginResponse.body.token
}




module.exports = {
    userInDB,
    userToken,
    initBlogs,
    blogsInDB,
}