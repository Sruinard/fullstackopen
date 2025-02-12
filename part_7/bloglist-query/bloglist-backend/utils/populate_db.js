const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const MONGODB_URI = process.env.MONGODB_URI

const initialBlogs = [
  {
    title: "React Patterns and Best Practices",
    author: "Dan Abramov",
    url: "https://reactpatterns.com/",
    likes: 150,
    comments: [
      "Great article!",
      "Really helpful for understanding React patterns"
    ]
  },
  {
    title: "The Art of Unit Testing",
    author: "Martin Fowler",
    url: "https://martinfowler.com/testing",
    likes: 85,
    comments: [
      "Changed my perspective on testing",
      "Very comprehensive guide"
    ]
  },
  {
    title: "Understanding Redux Toolkit",
    author: "Mark Erikson",
    url: "https://redux-toolkit.js.org/",
    likes: 120,
    comments: [
      "Redux made simple",
      "Great examples"
    ]
  },
  {
    title: "Modern JavaScript Features",
    author: "Axel Rauschmayer",
    url: "https://2ality.com/",
    likes: 95,
    comments: [
      "Excellent explanation of new JS features",
      "Very detailed"
    ]
  }
]

const initialUsers = [
  {
    username: "sruinard",
    name: "Stef Ruinard",
    password: "sekret"
  },
  {
    username: "testuser",
    name: "Test User",
    password: "secretpass"
  },
  {
    username: "admin",
    name: "Admin User",
    password: "adminpass"
  }
]

const populateDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing data
    await Blog.deleteMany({})
    await User.deleteMany({})
    console.log('Cleared existing data')

    // Create users
    const createdUsers = []
    for (const user of initialUsers) {
      const passwordHash = await bcrypt.hash(user.password, 10)
      const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash
      })
      const savedUser = await newUser.save()
      createdUsers.push(savedUser)
      console.log(`Created user: ${user.username}`)
    }

    // Create blogs and assign to users randomly
    for (const blog of initialBlogs) {
      const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)]
      const newBlog = new Blog({
        ...blog,
        user: randomUser._id
      })
      const savedBlog = await newBlog.save()
      console.log(`Created blog: ${blog.title}`)
    }

    console.log('Database populated successfully!')
    mongoose.connection.close()
  } catch (error) {
    console.error('Error populating database:', error)
    mongoose.connection.close()
  }
}

populateDb() 