const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: Admin')
    next()
})

router.post('/login')

const adminRouter = router
module.exports = adminRouter