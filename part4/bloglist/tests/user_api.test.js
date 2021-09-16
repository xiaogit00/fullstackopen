const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
require('express-async-errors')
const api = supertest(app)
const User = require('../models/user')

test('can create new user', async () => {

    const newUser = {
        name: 'Leibing',
        username: 'xiaogit00',
        password: 'hellothere'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

describe.only('restrictions on username and password are working', () => {
    test('user creation fails when username or password empty in POST request', async () => {
        const newUser = {
            name: 'Fatin',
            password: 'dsadsa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(401)

        expect(result.body.error).toContain('please enter a username or password')
    })

    test('user creation fails when username is shorter than 3 characters', async () => {
        const newUser = {
            username: 'Le',
            password: '12345555',
            name: 'Leibing'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(401)

        expect(result.body.error).toContain('Username must be more than 3')
    })

    test('user creation fails when password is shorter than 3 characters', async () => {
        const newUser = {
            username: 'Leibing',
            password: '12',
            name: 'Leibing'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(401)

        expect(result.body.error).toContain('Password must be more than 3 letters long')
    })

    test('user creation fails when username is not unique', async () => {
        const newUser = {
            username: 'xiaogit00',
            password: '12332',
            name: 'Leibing'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('`username` to be unique')
    })
})

afterAll(() => {
    mongoose.connection.close()
})
