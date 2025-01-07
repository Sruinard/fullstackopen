const jwt = require('jsonwebtoken')
const Router = require('express').Router()
const Blog = require('../models/blogpost')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}


Router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.status(200).json(blogs)
})

Router.post('/', async (request, response, next) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const {title, author, url, likes} = request.body
  const user = await User.findById(decodedToken.id)

  try {
    const blog = new Blog({
      title,
      author,
      url,
      likes,
      user: user.id
    })
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
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