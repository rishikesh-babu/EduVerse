const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    name: {}, 
    createAt: {
        type: Date, 
        default: Date.now,
    }
})

const Class = mongoose.model('Class', classSchema)
module.exports = Class