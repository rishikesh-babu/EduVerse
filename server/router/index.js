const express = require('express');
const userRoutes = require('./userRoutes');
const { adminAuth } = require('../middlewares/adminAuth');
const { createClass } = require('../controller/classController');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Routes: Api');
    next()
})

router.use('/user', userRoutes)
router.use('/class', adminAuth, createClass)
// router.use('/subject')

const apiRouter = router
module.exports = apiRouter;