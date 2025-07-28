const prisma = require('../db');

const sendChat = async (bidId,userId,chatMessage) => {
    const result = await prisma.chats.create({
        data: {
            bidId: bidId,
            userId: userId,
            chatText: chatMessage
        }
    })
    if (!result) return false;
    return result;
}

module.exports = sendChat