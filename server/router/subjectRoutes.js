const express = require('express')
const { adminAuth } = require('../middlewares/adminAuth')
const { createSubject } = require('../controller/subjectController')
const { upload } = require('../middlewares/multer')
const router = express.Router()

router.use((req, res, next) => {
    console.log('Routes: Subject')
    next()
})

router.post('/create', adminAuth, upload.single('raw'), createSubject)

const subjectRouter = router
module.exports = subjectRouter