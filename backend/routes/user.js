const express = require('express')
const router = express.Router()
const {register, read, update, remove} = require('../controllers/user.js')

router.route('/')
    .post(register)
    .get(read)

router.route('/:id')
    .put(update)
    .delete(remove)

module.exports = router