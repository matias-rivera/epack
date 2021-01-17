const express = require('express')
const router = express.Router()
const {register} = require('../controllers/user.js')

router.route('/')
    .post(register)

module.exports = router