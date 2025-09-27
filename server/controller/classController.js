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

async function getAllClasses(req, res, next) {
    try {
        console.log('Router: Get Classes')

        const classes = await Class.find().sort({ createdAt: -1 });

        console.log('classes :>> ', classes);

        return res.status(200).json({ message: 'Classes fetched successfully', data: classes })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createClass,
    getAllClasses
}