
const Router = require('express').Router()
const Blog = require('../models/blogpost')
const User = require('../models/user')




Router.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
  response.status(200).json(blogs)
})

Router.post('/', async (request, response, next) => {
  const userId = request.userId

  if (!userId) {
    return response.status(401).json({ error: 'user not defined. please make sure you are authenticated' });
  }
  const {title, author, url, likes} = request.body
  const user = await User.findById(userId)

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
  const blogId = request.params.id;
  const userId = request.userId

  if (!userId) {
    return response.status(401).json({ error: 'user not defined. please make sure you are authenticated' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog || blog.user.toString() !== userId) {
      return response.status(403).json({ error: 'Unauthorized to delete this blog' });
    }
    await blog.deleteOne();
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

module.exports = Router