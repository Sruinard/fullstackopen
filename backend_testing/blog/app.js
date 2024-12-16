const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogposts')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)    
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use(middleware.validationErrorHandler)

module.exports = app