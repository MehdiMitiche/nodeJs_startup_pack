const express = require('express') ; 
const adminRouter = express.Router() ; 

const adminController = require('../controllers/adminController')

adminRouter.post('/', adminController.addAdmin)
adminRouter.get('/',adminController.getAdmin)
adminRouter.put('/',adminController.updateAdmin)
adminRouter.delete('/',adminController.deleteAdmin)

module.exports = adminRouter