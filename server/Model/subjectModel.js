const mongoose = require('mongoose')

const subjectModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class',
        required: true,
    },
    file: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date, 
        default: Date.now,
    }
})