const express = require('express')
const router = express.Router()
const {create} = require('../controllers/order.js')
const { protect, admin } = require('../middleware/authMiddleware.js')

router.route('/')
    .post(create)

/* router.route('/:id')
    .get(read)
    .put(update)
    .delete(remove) */

module.exports = router