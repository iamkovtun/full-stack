//build model for user
//      without: any references
//      with: username, password and name
//      it should have a toJSON() whrere format of otput set to {username, name, id}
//build controller for user
//      make post request to create a usee, bcrypt to store passwords
//      get request to fetch all users
// implement error handler. just copy form tutorial github

const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

router.post('/', async (request, response, next) => {
    try {
        const { name, username, password } = request.body

        // Validate password
        if (!password || password.length < 3) {
            throw new Error('Password must be at least 3 characters long')
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            name,
            username,
            passwordHash
        })

        const userSaved = await user.save()
        response.status(201).json(userSaved)
    } catch (error) {
        next(error)
    }
})

router.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs')
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

module.exports = router