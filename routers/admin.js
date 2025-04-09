const express = require('express')
const Controller = require('../controllers/controller')
const admin = express.Router()

admin.get('/', Controller.dashboard)

module.exports = admin