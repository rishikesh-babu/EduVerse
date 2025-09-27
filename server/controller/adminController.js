const User = require("../Model/userModel")

async function adminSignup(req, res, next) {
    try {
        console.log('Routes: signup')

        const { name, email, password, mobile } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userExist = await User.findOne({ email })

        if (adminExist) {
            return res.status(400).json({ message: 'Email already exist' })
        }

        const newAdmin = new User({
            name,
            email,
            password,
            role: 'admin'
        })

        await newAdmin.save()

        const token = generateToken(newAdmin, 'admin')

        setCookies(res, token)

        res.status(201).json({ message: 'Signup successfully' })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    adminSignup
}