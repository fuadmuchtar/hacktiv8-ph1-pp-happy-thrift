const express = require('express')
const Controller = require('../controllers/controller')
const router = express.Router()

router.get('/', Controller.testingPage)

router.use('/admin', require('./admin'))

module.exports = router