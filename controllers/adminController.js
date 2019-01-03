const mongoose = require('mongoose')
const adminSchema = require('../models/Admin')


const Admin = mongoose.model('Admin' , adminSchema)

//CRUD OPERATIONS
const getAdmin = () => {

}

const addAdmin = () => {
	
}

const updateAdmin = () => {
	
}

const deleteAdmin = () => {
	
}

module.exports = {
	getAdmin,
	addAdmin,
	updateAdmin,
	deleteAdmin
}