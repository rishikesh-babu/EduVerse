const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const apiRouter = require('./router');
const connectDB = require('./config/db');
const port = 3000;

dotenv.config();
connectDB();

const app = express();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
})

app.use((req, res, next) => {
    console.log('\nMethod: ', req.method);
    console.log('Path: ', req.path);
})

// Base Router
app.get('/', (req, res) => {
    return res.send('Hello World');
})

app.use('/api', apiRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    return res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
});

// Catch-all for unknown routes
app.use((req, res) => {
    console.warn('Endpoint does not exist:', req.originalUrl);
    return res.status(404).json({ message: 'Endpoint does not exist' });
});