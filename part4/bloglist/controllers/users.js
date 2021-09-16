const usersRouter = require('express').Router()
const User = require('../models/user')
require('express-async-errors')
const bcrypt = require('bcrypt')
//**********************************************************
//*                     Pseudo-code
//**********************************************************
// Alright, I've basically received the response, added the info into
// the model, hashed the password, and saved the user into MongoDB.

// I'll add a test to check if this is possible.

usersRouter.get('/', async (request, response) => {

    const users = await User.find({}).populate('blogs')


    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body
    // CONDUCT CHECKS
    if (!body.username || !body.password) {
        return response.status(401).json({
            error: 'please enter a username or password'
        })
    } else if (body.username.length<4) {
        return response.status(401).json({
            error: 'Username must be more than 3 letters long.'
        })
    } else if (body.password.length<4) {
        return response.status(401).json({
            error: 'Password must be more than 3 letters long'
        })
    }




    //PASSED CHECKS
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)


    const newUser = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await newUser.save()
    response.json(savedUser)
})

module.exports = usersRouter
