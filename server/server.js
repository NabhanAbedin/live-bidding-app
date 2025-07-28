const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const attachSocket = require('./socketIndex');
const http = require('http');

const AppError = require('./utils/AppError');
const { globalErrorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const bidRoutes = require('./routes/bidsRoutes');
const usersRoutes = require('./routes/usersRoutes');

const server = http.createServer(app);

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}))

app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/bids', bidRoutes);

app.use('/api/users', usersRoutes);

app.all('/*splat', (req,res,next) => {

    const err = new AppError(`Can't find ${req.originalUrl} on server`, 404);
    next(err);
})

attachSocket(server);

app.use(globalErrorHandler);

app.listen(5002, () => {
    console.log('server + socket started on port 5002');
})