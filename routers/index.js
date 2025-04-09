const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('test')
})
// router.use('/admin', require('./admin'))

module.exports = router