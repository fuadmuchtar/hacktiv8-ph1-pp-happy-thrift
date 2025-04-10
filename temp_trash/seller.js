const express = require('express')
const seller = express.Router()

seller.get('/', (req, res)=>{
    res.send('masuk seller')
})

module.exports = seller