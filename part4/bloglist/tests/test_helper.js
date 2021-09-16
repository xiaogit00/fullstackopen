const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'First post',
        author: 'Fatin',
        url: 'fatfly.com',
        likes: 999,
        user: '6141dd1b6f7150615c963d41'
    },
    {
        title: 'Second post',
        author: 'Leibing',
        url: '1111ly.com',
        likes: 90,
        user: '6141dd1b6f7150615c963d41'
    }
]

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    blogsInDB, initialBlogs
}
