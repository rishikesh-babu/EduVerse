const express = require('express')
const { adminAuth } = require('../middlewares/adminAuth')
const { createClass, getAllClasses } = require('../controller/classController')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: Class')
    next()
})

router.post('/create', adminAuth, createClass)
router.get('/get-all-classes', getAllClasses)

const classRouter = router
module.exports = classRouter