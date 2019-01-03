const express = require('express'); 
const userRouter = express.Router(); 

const userController = require('../controllers/userController')

userRouter.post('/', userController.addUser)
userRouter.get('/',userController.getUser)
userRouter.put('/:id',userController.updateUser)
userRouter.delete('/',userController.deleteUser)

module.exports = userRouter