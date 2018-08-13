const jwt = require('express-jwt');

const auth = jwt({ secret: process.env.JWT_SECRET })

module.exports = auth;