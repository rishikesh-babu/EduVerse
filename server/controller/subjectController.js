const { cloudinaryInstance } = require("../config/cloudinary");
const Class = require("../Model/classModel");

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

        const clsasExist = await Class.findById({ classId });

        if (!clsasExist) {
            return res.status(404).json({ message: 'Class does not exist' });
        }

        const imageUrl = (await cloudinaryInstance.uploader.upload(req.file.path, {
            folder: `Eduverse/Subject/${name}`,
            public_id: name
        })).secure_url

        const newSubject = { 
            name, 
            classId, 
            file: imageUrl
        }

        await newSubject.save();
        return res.status(201).json({ message: 'Subject created successfully', data: newSubject });
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createSubject
}