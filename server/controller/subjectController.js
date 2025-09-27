const { cloudinaryInstance } = require("../config/cloudinary");
const Class = require("../Model/classModel");
const Subject = require("../Model/subjectModel");

async function createSubject(req, res, next) {
    try {
        console.log('Router: Create Subject');

        const { name, classId } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Subject name is required' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'Subject file is required' });
        }

        if (!classId) {
            return res.status(400).json({ message: 'Class ID is required' });
        }

        const classExist = await Class.findOne({ _id: classId });

        if (!classExist) {
            return res.status(404).json({ message: 'Class does not exist' });
        }

        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
            folder: `Eduverse/Subject/${name}`,
            public_id: name
        })).secure_url

        const newSubject = new Subject({
            name,
            classId,
            file: imageUrl
        })

        await newSubject.save();
        return res.status(201).json({ message: 'Subject created successfully', data: newSubject });
    } catch (err) {
        next(err)
    }
}

async function getAllSubject(req, res, next) {
    try {
        console.log('Router: Get All Subjects');

        const subjectExist = await Subject.find().sort({ createdAt: -1 });

        return res.status(200).json({ message: 'Subjects fetched successfully', data: subjectExist });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createSubject, 
    getAllSubject
}