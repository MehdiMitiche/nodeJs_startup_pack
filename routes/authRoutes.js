const express = require('express')
const authRouter = express.Router()

const userController = require('../controllers/userController')

authRouter.post('/register', userController.register)
authRouter.post('/login' , userController.login)


module.exports = authRouter