const express = require('express');
const userRoutes = require('./userRoutes');
const router = express.Router();

router.use('/user', userRoutes)

const apiRouter = router
module.exports = apiRouter;