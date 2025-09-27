const express = require('express');
const userRoutes = require('./userRoutes');
const classRouter = require('./classRoutes');
const subjectRouter = require('./subjectRoutes');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Routes: Api');
    next()
})

router.use('/user', userRoutes)
router.use('/class', classRouter)
router.use('/subject', subjectRouter)

const apiRouter = router
module.exports = apiRouter;