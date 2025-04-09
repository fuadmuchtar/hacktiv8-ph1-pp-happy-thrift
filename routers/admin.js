const express = require('express')
const admin = express.Router()

admin.get('/', (req, res)=>{
    res.send('masuk')
})

module.exports = admin