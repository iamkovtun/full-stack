const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const api = supertest(app)
const bcrypt = require('bcrypt')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany()
    const saltRounds = 10
    const passwordHash = await bcrypt.hash('myPassword', saltRounds)
    const user = new User({ name: 'Tom', username: 'tom1', passwordHash: passwordHash })
    await user.save()

})

describe('init user tests', () => {
    test('user are created correctly', async () => {
        const atStartUser = await helper.userInDB()
        const user = {
            name: 'Sem',
            username: 'sem1',
            password: 'mypassword'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(201)

        const atEndUser = await helper.userInDB()
        assert.strictEqual(atStartUser.length + 1, atEndUser.length)
    })

    test('if password less than 3', async () => {
        const atStartUser = await helper.userInDB()
        const user = {
            name: 'Sem',
            username: 'sem1',
            password: 'pa'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const atEndUser = await helper.userInDB()
        assert.strictEqual(atStartUser.length, atEndUser.length)
    })
    test('if username less than 3', async () => {
        const atStartUser = await helper.userInDB()
        const user = {
            name: 'Sem',
            username: 'se',
            password: 'password'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const atEndUser = await helper.userInDB()
        assert.strictEqual(atStartUser.length, atEndUser.length)
    })
    test('if username not provided', async () => {
        const atStartUser = await helper.userInDB()
        const user = {
            name: 'Sem',
            password: 'password'
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const atEndUser = await helper.userInDB()
        assert.strictEqual(atStartUser.length, atEndUser.length)
    })
    test('if password is not provided', async () => {
        const atStartUser = await helper.userInDB()
        const user = {
            name: 'Sem',
            username: 'sem1',
        }
        await api
            .post('/api/users')
            .send(user)
            .expect(400)

        const atEndUser = await helper.userInDB()
        assert.strictEqual(atStartUser.length, atEndUser.length)
    })


})

after(async () => {
    await mongoose.connection.close()
})
