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

Router.put('/:id', async (request, response, next) => {
  try {
    const updateBlogDictDelta = {
      likes: request.body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlogDictDelta, { new: true })
    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }
    response.status(201).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

Router.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

module.exports = Router