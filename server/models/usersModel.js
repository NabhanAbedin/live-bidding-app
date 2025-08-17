const prisma = require('../db');
const {Temporal} = require('@js-temporal/polyfill');

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
                    highestBid: true,
                    startTime: true
                }
            }
        },
        take: 5
    })

    return row.map(entry => ({
        bidItem: entry.bids.bidItem,
        bidSold: entry.bids.highestBid,
        startTime: entry.bids.startTime
    }));
}

const totalEarnedModel = async (userId) => {
  const nowInstant = Temporal.Now.instant();
  const nowDate = new Date(nowInstant.epochMilliseconds);

    const row = await prisma.bids.aggregate({
        where: {
            userId: userId,
            endTime: {lt: nowDate}
        },
        _sum: {
            highestBid: true
        }
    })
    
   return  row._sum.highestBid ? row._sum.highestBid : 0;
}

const addTransaction = async (userId,amount) => {
    const row = await prisma.transactions.create({
        data: {
            userId: userId,
            transactionAmount: amount
        }
    })

    return row;
}


module.exports = {
    updateCurrency,
    getCurrency,
    recentTransactions,
    totalEarnedModel,
    addTransaction,

}