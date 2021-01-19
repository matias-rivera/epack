const express = require('express')
const router = express.Router()
const {register, readAll, read, update, remove, login} = require('../controllers/user.js')


router.route('/')
    .post(register)
    .get(readAll)

router.route('/:id')
    .get(read)
    .put(update)
    .delete(remove)

router.route('/login')
    .post(login)

module.exports = router