const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError');
const globalErrorhandler = require('./middleware/errorMiddleware');

app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}))

app.all('/*splat', (req,res,next) => {

    const err = new AppError(`Can't find ${req.originalUrl} on server`, 404);
    next(err);
})

app.use(globalErrorhandler);
app.use(express.json());



app.listen(5002, () => {
    console.log('server started');
})