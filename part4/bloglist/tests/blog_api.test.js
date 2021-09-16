const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('test id', async () => {
    //I should get all the blogs right - and then what does it return in?
    // const response = await api.get('/api/notes')
    const blogs = await helper.blogsInDB()
    const checkForId = () => {
        if (blogs.filter(blog => blog.id).length === blogs.length) {
            console.log('All the keys of the ID fields are called id')
            return true
        } else {
            console.log('Not all the keys of the ID fields are called id')
            return undefined
        }
    }

    expect(checkForId()).toBeDefined()

})

test.only('can make POST', async () => {

    const initialPosts = await helper.blogsInDB()

    const newPost = {
        title: 'test post',
        author: 'Fatin',
        url: 'fatfly.com',
        likes: 999
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhpYW9naXQwMCIsImlkIjoiNjE0MmY2ZjMwZDA3MGI1OGZjYThlYWMxIiwiaWF0IjoxNjMxNzc4NjYwfQ.PTPt4OZDP6g2L4J6UvYD6sYSIRkm2rg6ViAEx3dtWuc')
        .send(newPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.blogsInDB()
    expect(postsAtEnd).toHaveLength(initialPosts.length + 1)

    const contents = postsAtEnd.map(p => p.title)
    expect(contents).toContain(
        'test post'
    )

})

test('always have likes value', async () => {
    //the test fails if either likes is missing, or if likes not Int
    //Check for the request? That means this test runs when a post
    //request runs?
    const newPost = {
        title: 'test post',
        author: 'Fatin',
        url: 'fatfly.com'
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDB()
    const addedBlog = await blogsAtEnd.find(blog => blog.title === 'test post')
    expect(addedBlog.likes).toBe(0)


})

test('always have title and url', async () => {
    const newPost = {
        author: 'Fatin',
        likes: 999
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(400)

})

test('can delete', async () => {
    const blogID = '613c3d90238f0a6238bea36b'
    await api
        .delete(`/api/blogs/${blogID}`)
        .expect(204)

})

test('can update', async () => {
    const blogID = '61404d7d124ad93f13bf430e'
    const newPost = {
        title: 'this is my post',
        likes: 55
    }
    await api
        .put(`/api/blogs/${blogID}`)
        .send(newPost)
        .expect(200)
})

afterAll(() => {
    mongoose.connection.close()
})
