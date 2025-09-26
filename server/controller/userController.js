const User = require("../Model/userModel");

async function userLogin(req, res, next) {
    try {
        console.log('Router: Login')

        let { email, password } = req.body

        email = email?.trim()
        password = password?.trim()

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' })
        }

        let userExist = await User.findOne({ email })

        if (!userExist) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        if (userExist.password !== password) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        userExist = userExist.toObject()
        delete userExist.password

        return res.status(200).json({ message: 'Login successful', data: userExist })
    } catch (err) {
        next(err);
    }
}

async function userSignup(req, res, next) {
    try {
        console.log('Router: Signup')

        let { name, email, phone, password, } = req.body

        name = name?.trim()
        email = email?.trim()

        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(409).json({ message: 'User already exists' })
        }

        const newUser = new User({
            name,
            email,
            phone,
            password,
            role: 'user'
        })

        let saveUser = await newUser.save()
        saveUser = saveUser.toObject()
        delete saveUser.password

        console.log('saveUser :>> ', saveUser);

        return res.status(201).json({ message: 'User registered successfully', data: saveUser })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userLogin,
    userSignup
}