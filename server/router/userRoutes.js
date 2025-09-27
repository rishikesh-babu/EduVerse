const express = require('express');
const { userLogin, userSignup, userLogout } = require('../controller/userController');
const { userAuth } = require('../middlewares/userAuth');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Routes: User');
    next()
})

router.post('/login', userLogin); 
router.post('/signup', userSignup)

router.post('/logout', userAuth, userLogout)

const userRoutes = router
module.exports = userRoutes;