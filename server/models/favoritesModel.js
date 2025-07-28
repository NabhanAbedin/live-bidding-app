const prisma = require('../db');

const getFavoritesModel = async (userId) => {
    const rows = await prisma.favorites.findMany({
        select: {
            bidId: true,
            bids: {
                select: {
                    bidItem: true,
                    startingBid: true,
                    highestBid: true,
                    posted: true,
                    bid_duration: true
                }
            }
        }
    })

    return rows.map(({ bidId, bids }) => ({
        bidId,
        ...bids
      }));
}

const addToFavoritesModel = async (bidId,userId) => {
    const rows = await prisma.favorites.create({
        data: {
            bidId: bidId,
            userId: userId
        }
    })

     if (rows.count === 0) {
        return false;
     }
     return true;
}

const deleteFavoritesModel = async (bidId,userId) => {
    const rows = await prisma.favorites.delete({
        where: {
            bidId: bidId,
            userId: userId
        }
    })

    if (rows.count === 0) {
        return false;
     }
     return true;
}

module.exports = {
    getFavoritesModel,
    addToFavoritesModel,
    deleteFavoritesModel
}
