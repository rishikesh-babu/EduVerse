const Class = require("../Model/classModel")

async function createClass(req, res, next) {
    try {
        console.log('Router: create class')

        const { name } = req.body

        if (!name) {
            return res.status(400).json({ message: 'Class name is required' })
        }

        const classExist = await Class.findOne({ name })

        if (classExist) {
            return res.status(400).json({ message: 'Class already exist' })
        }

        const newClass = new Class({ name })
        await newClass.save()
        return res.status(201).json({ message: 'Class created successfully', data: newClass })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createClass
}