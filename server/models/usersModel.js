const prisma = require('../db');


const updateCurrency = async (currency, userId) => {
    const row = await prisma.users.update({
        where: {
            id: userId
        },
        data: {
            currency: {
                increment: currency
            }
        }
    })

    return row;
}

const getCurrency = async (userId) => {
    const row = await prisma.users.findUnique({
        where: {
            id: userId
        },
        select: {
            currency: true
        }
    })

    return row.currency;
}

const recentTransactions = async (userId) => {
    const row = await prisma.collections.findMany({
        where: {
            userId: userId
        },
        select: {
            bids: {
                select: {
                    bidItem: true,
                    bidSold: true,
                    startTime: true
                }
            }
        },
        take: 5
    })

    return row.map(entry => ({
        bidItem: entry.bids.bidItem,
        bidSold: entry.bids.bidSold,
        startTime: entry.bids.startTime
    }));
}

module.exports = {
    updateCurrency,
    getCurrency,
    recentTransactions

}