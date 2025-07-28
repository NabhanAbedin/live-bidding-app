const jwt = require('jsonwebtoken');
const socketIO = require('socket.io');
const bidsEvents = require('./socket_handlers/bidsEvents');
const chatsEvents = require('./socket_handlers/chatsEvents');
const AppError = require('./utils/AppError');

const attachSocket = (server) => {
  const io = socketIO(server, {
    cors: { origin: 'http://localhost:5174', credentials: true }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', socket => {
    socket.on('joinBidRoom', bidId => {
      socket.join(`bidRoom:${bidId}`);
    });
    bidsEvents(io, socket);
    chatsEvents(io, socket);
  });

  return io;
};

module.exports = attachSocket
