const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');  
const apiRouter = require('./router');
const port = 3000; 

const app = express();

app.listen(port, (err) => {
    if (!err) {
        console.log(`Server is running on port ${port}`);
    }
})

app.use('/api', apiRouter);