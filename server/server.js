const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError');
const { globalErrorHandler } = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');
const bidRoutes = require('./routes/bidsRoutes');
const usersRoutes = require('./routes/usersRoutes');

app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}))

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/bids', bidRoutes);

app.use('/users', usersRoutes);

app.all('/*splat', (req,res,next) => {

    const err = new AppError(`Can't find ${req.originalUrl} on server`, 404);
    next(err);
})

app.use(globalErrorHandler);

app.listen(5002, () => {
    console.log('server started');
})