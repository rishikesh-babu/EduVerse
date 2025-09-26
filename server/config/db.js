const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGO_URL, {})
        .then((res) => {
            console.log('Connected to DB');
        })
        .catch((err) => {
            console.log('Error in connecting to DB', err);
        })
}

module.exports = connectDB;