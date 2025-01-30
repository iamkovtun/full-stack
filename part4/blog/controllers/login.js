const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (request, response, next) => {
    try {
        const { username, password } = request.body

        const user = await User.findOne({ username })
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(password, user.passwordHash)

        if (!(passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }
        const token = jwt.sign(
            userForToken,
            process.env.SECRET,
            { expiresIn: 60*60*24*7 }
        )

        response
            .status(200)
            .send({ token, username: user.username, name: user.name })

    } catch (error) {
        next(error)
    }
})


module.exports = router