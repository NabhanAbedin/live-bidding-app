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
module.exports = {
    updateCurrency,
    getCurrency

}