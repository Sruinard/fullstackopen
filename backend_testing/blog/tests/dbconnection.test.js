
const { test, describe } = require('node:test')
const config = require("../utils/config")
// testConnection.js
const mongoose = require('mongoose');
const Blog = require("../models/blogpost")


test('database-connection-succeeds', async () => {
    mongoose.connect(config.MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected successfully');
            mongoose.connection.close(); // Close the connection after testing
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });

    await Blog.deleteMany({}).

}
)