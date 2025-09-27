const User = require("../Model/userModel");
const { setCookies, clearCookies } = require("../utils/cookies");
const { generateToken } = require("../utils/token");

async function userLogin(req, res, next) {
    try {
        console.log('Router: Login')

        let { email, password } = req.body

        console.log('req.body :>> ', req.body);

        email = email?.trim()
        password = password?.trim()

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password are required' })
        }

        let userExist = await User.findOne({ email })
        
        console.log('userExist :>> ', userExist);
        if (!userExist) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        console.log('userExist.password :>> ', userExist.password);
        console.log('password :>> ', password);

        if (userExist.password !== password) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        userExist = userExist.toObject()
        delete userExist.password

        const token = generateToken(userExist, 'user')
        setCookies(res, token)

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

        const token = generateToken(saveUser, 'user')
        setCookies(res, token)

        return res.status(201).json({ message: 'User registered successfully', data: saveUser })
    } catch (err) {
        next(err)
    }
}

async function userLogout(req, res, next) {
    try {
        console.log('Routes: Logout')

        clearCookies(res) 
        return res.status(200).json({ message: 'Logout successful' })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    userLogin,
    userSignup, 
    userLogout
}