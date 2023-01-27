const express = require('express');
const route = express.Router();
const userControl = require('../controller/users')
const { verifyToken } = require('../middleware/verifyToken')
const {refreshToken} = require('../controller/refreshToken')

route.get('/', verifyToken, userControl.getUser)
route.post('/', userControl.newUser)
route.post('/login', userControl.login)
route.get('/token', refreshToken)
route.delete('/logout', userControl.logout)

module.exports = route