const express = require('express');
const { userLogin, userSignup } = require('../controller/userController');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Routes: User');
    next()
})

router.post('/login', userLogin); 
router.post('/signup', userSignup)

const userRoutes = router
module.exports = userRoutes;