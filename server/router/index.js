const express = require('express');
const userRoutes = require('./userRoutes');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Routes: Api');
    next()
})

router.use('/user', userRoutes)

const apiRouter = router
module.exports = apiRouter;