const express = require('express')
const { model } = require('mongoose')
const { addUser, allUsers, userDetail, editUser, deleteUser, loginUser, getLogUser } = require('../controller/userController')
const fetchuser = require('../middleware/fetchuser')
const { userRules, validation } = require('../validation')
const router = express.Router()

router.post('/createuser', userRules, validation, addUser)
router.get('/allusers', allUsers)
router.get('/userdetail/:id', userDetail)
router.put('/edituser/:id', editUser)
router.delete('/deleteuser/:id', deleteUser)
router.post('/login', validation, loginUser)
router.post('/loguser', fetchuser, getLogUser)

module.exports = router