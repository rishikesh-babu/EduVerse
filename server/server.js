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

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
})

app.use('/api', apiRouter);