const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const listHelper = require('../utils/list_helper')
const app = require("../app")
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blogpost')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogs)
})



test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('likes', () => {
    test('numberOfLikesSingleItemInArray', () => {
        const result = listHelper.computeTotalLikes(blogs)
        assert.strictEqual(result, 36)
    }),
    test('favoriteBlogPost', () => {

        const actual = listHelper.favoriteBlogPost(blogs)
        console.log('actual', actual)

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
        const actual = listHelper.mostBlogs(blogs)
        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        } 
        assert.deepStrictEqual(actual, expected)
    }),
    test('mostLikedAuthor', () => {
        const actual = listHelper.mostLikes(blogs)
        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
          } 
        assert.deepStrictEqual(actual, expected)
    })
       
})

describe('api integration tests', () => {
  test('GET request', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(helper.blogs.length, response.body.length)

  })
})