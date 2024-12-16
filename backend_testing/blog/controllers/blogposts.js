const Router = require('express').Router()
const Blog = require('../models/blogpost')


Router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
})

Router.post('/', async (request, response, next) => {

  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch(exception) {
    console.log('failed to add new blog...')
    next(exception)

    // response.status(400).end()
  }
})

module.exports = Router