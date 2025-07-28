const prisma = require('../db');

const getChatsModel = async (bidId) => {
    const chats = await prisma.chats.findMany({
        where: {
            bidId: bidId
        }
    })

    return chats;
}

module.exports = {
    getChatsModel
}