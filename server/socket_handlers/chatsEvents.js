const sendChat = require('../services/chatsService');

module.exports = (io,socket) => {
    socket.on('sendChat', async ({bidId,chatMessage}) => {
        try {
            const newMessage = await sendChat(Number(bidId),Number(socket.userId), String(chatMessage));

            if (!newMessage) {
                return socket.emit('chatError', {
                    bidId,
                    message: 'Your message didnt send, try again'
                })
            }

            io.to(`bidRoom:${bidId}`).emit('chatSent', newMessage)
        } catch (err) {
            console.log(err);
            socket.emit('chatError', {
                bidId,
                message: 'Something went wrong please try again'
            })
        }
    })
}