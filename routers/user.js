const express = require('express')
const user = express.Router()

user.get('/', (req, res)=>{
    res.send('masuk user')
})

module.exports = user