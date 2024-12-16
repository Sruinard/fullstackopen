
const { test, describe } = require('node:test')
const config = require("../utils/config")
// testConnection.js
const mongoose = require('mongoose');


test('database-connection-succeeds', () => {
    mongoose.connect(config.MONGODB_URI)
        .then(() => {
            console.log('MongoDB connected successfully');
            mongoose.connection.close(); // Close the connection after testing
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });

}
)