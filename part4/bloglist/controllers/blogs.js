const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
    // console.log(await request.user)
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})



blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await request.user
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: (body.likes) ? body.likes : 0,
        user: user._id
    })
    console.log(blog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    //Pseudocode
    // Find and return the data of the user who created the post

    const user = await request.user
    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)

    if (blog.user._id.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({error: 'Unauthorized'})
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const updatedBlog = {
        title: body.title,
        likes: body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true})
    response.json(updatedBlog)
})

module.exports = blogsRouter
