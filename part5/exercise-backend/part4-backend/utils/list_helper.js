var _ = require('lodash')

const dummy = (blogs) => {
    return 2
}

const totalLikes = (blogs) => {
    const totalLikes = blogs.reduce((a, blog) => blog.likes + a, 0)

    return totalLikes
}

const favouriteBlog = (blogs) => {
    let topLikes = 0
    blogs.map(blog => {
        if (blog.likes > topLikes) {
            topLikes = blog.likes
            console.log(topLikes)
        }
    })
    const topBlogs = blogs.filter(blog => blog.likes === topLikes)
    return topBlogs[0]
}

const mostBlogs = (blogs) => {
    //loop through an array of objects - convert all the values of author to an array.
    // count number of

    const topAuthorData = Object.entries(_.countBy(blogs, 'author')).sort((a,b) => {
        return b[1] - a[1]
    })[0]

    const topAuthor = {
        author: topAuthorData[0],
        blogs: topAuthorData[1]
    }

    return topAuthor

}

const mostLikes = (blogs) => {

    const mostLikes = Object.entries(_.groupBy(blogs, (blog) => blog.author)).map(blog => {
        const mostLikes = {
            author: blog[0],
            likes: _.sumBy(blog[1], 'likes')
        }
        return mostLikes
    }).sort((a,b) => {
        return b.likes - a.likes
    })[0]

    return mostLikes
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
