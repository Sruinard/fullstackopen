const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const app = require("../app")
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogpost')
const User = require('../models/user')
// testConnection.js


beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
  const user = new User({ username: 'testuser', password: 'testpassword' })
  await user.save()
})

describe('dummy test', () => {
  test('dummy returns one', () => {
    const result = listHelper.dummy(helper.blogs)
    assert.strictEqual(result, 1)
  })
})

describe('likes', () => {
    test('numberOfLikesSingleItemInArray', () => {
        const result = listHelper.computeTotalLikes(helper.blogs)
        assert.strictEqual(result, 36)
    }),
    test('favoriteBlogPost', () => {

        const actual = listHelper.favoriteBlogPost(helper.blogs)

        const expected = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }
        assert.deepStrictEqual(actual, expected)
    }),
    test('mostActiveWriter', () => {
        const actual = listHelper.mostBlogs(helper.blogs)
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        } 
        assert.deepStrictEqual(actual, expected)
    }),
    test('mostLikedAuthor', () => {
        const actual = listHelper.mostLikes(helper.blogs)
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
          } 
        assert.deepStrictEqual(actual, expected)
    })
       
})

describe('api integration tests', () => {
  test('GET request', async () => {
    const token = await helper.getAuthToken('testuser', 'testpassword')
    const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
    assert.strictEqual(response.body.length, helper.blogs.length)
  }),
  test('Post request increases number of blogposts', async () => {
    const blog = {
      "title": "My First Blog Post",
      "author": "John Smith",
      "url": "https://example.com/blog/first-post",
      "likes": 0
  }
    const token = await helper.getAuthToken('testuser', 'testpassword')
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
    const response = await helper.blogsInDb()
    console.log('response type:', typeof response)
    console.log('number of elements:', response.length)
    assert.strictEqual(response.length, helper.blogs.length + 1)
  }),
  test('default likes to one', async () => {
    const blog = {
      "title": "My First Blog Post",
      "author": "John Smith",
      "url": "https://example.com/blog/first-post",
    }
    const token = await helper.getAuthToken('testuser', 'testpassword')
    res = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(blog)
    assert.strictEqual(res.body.likes, 0)

  })
  test('title and url are set', async () => {
    const blog = {
      // "title": "My First Blog Post",
      "author": "John Smith",
      // "url": "https://example.com/blog/first-post",
    }
    const token = await helper.getAuthToken('testuser', 'testpassword')
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(blog)
      .expect(400)

  })
  test('field id is present in blog object', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    assert.ok(firstBlog.id)
  })


  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      const token = await helper.getAuthToken('testuser', 'testpassword')
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.blogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })

  describe('update of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newNumberOfLikes = 200
      const blog = {
        likes: newNumberOfLikes
      }
      const token = await helper.getAuthToken('testuser', 'testpassword')
      res = await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `Bearer ${token}`).send(blog)
      assert.strictEqual(res.body.likes, newNumberOfLikes)
    })
  })


  
})