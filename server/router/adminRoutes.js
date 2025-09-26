const express = require('express')
const { adminSignup } = require('../controller/adminController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: Admin')
    next()
})

router.post('/signup', adminSignup)

const adminRouter = router
module.exports = adminRouter