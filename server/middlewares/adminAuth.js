const jwt = require('jsonwebtoken')
const Class = require('../Model/classModel')
const User = require('../Model/userModel')

async function adminAuth(req, res, next) {
    try {
        console.log('Routes: admin auth')

        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized admin' })
        }

        const secretKey = process.env.JWT_SECRET_KEY
        const decodedToken = jwt.verify(token, secretKey)

        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized admin' })
        }

        const userId = decodedToken.id
        const userExist = await User.findById(userId).select('-password')

        if (!userExist) {
            return res.status(401).json({ message: 'Unauthorized admin' })
        }

        req.user = decodedToken

        next()

    } catch (err) {
        next(err)
    }
}


module.exports = {
    adminAuth,
}