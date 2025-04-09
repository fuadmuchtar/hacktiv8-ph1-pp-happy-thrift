const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.landingPage)

router.use('/admin', require('./admin'))
router.use('/seller', require('./seller'))
router.use('/user', require('./user'))

module.exports = router