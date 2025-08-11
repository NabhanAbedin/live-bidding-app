const prisma = require('../db');

const getFavoritesModel = async (userId) => {
    const rows = await prisma.favorites.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true,
            bidId: true,
            bids: {
                select: {
                    bidItem: true,
                    startingBid: true,
                    highestBid: true,
                    posted: true,
                    category: true,
                    bid_duration: true
                }
            }
        }
    })

    return rows.map(({id, bidId, bids }) => ({
        id,
        bidId,
        ...bids
      }));
}

const getFavoritesByIdModel = async (userId, bidId) => {
    const row = await prisma.favorites.findMany({
        where: {
            bidId: bidId,
            userId: userId
        }
    })

    return row.length > 0;
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

const deleteFavoritesModel = async (bidId) => {
    const rows = await prisma.favorites.deleteMany({
        where: {
            bidId: bidId,
        }
    })

    if (rows.count === 0) {
        return false;
     }
     return true;
}

const deleteFavoritesForBidsModel = async (bidId) => {
    const row = await prisma.favorites.deleteMany({
        where: {
            bidId: bidId
        }
    })
    return row;
}

const checkFavoriteByBidModel = async (bidId, userId) => {
    const row = await prisma.favorites.findMany({
        where: {
            bidId: bidId,
            userId: userId
        }
    })

    return  row.length !== 0;
}

module.exports = {
    getFavoritesModel,
    getFavoritesByIdModel,
    addToFavoritesModel,
    deleteFavoritesModel,
    deleteFavoritesForBidsModel,
    checkFavoriteByBidModel
}
