const prisma = require('../db');


const createUser = async (username, passwordHash) => {
   const row = await prisma.users.create({
        data: {
            username: username,
            passwordHash: passwordHash
        },
        select: {
            id: true,
            username: true
        }
    })

    return row;
}

const finduserByName = async (username) => {
    const row = await prisma.users.findFirst({
        select: {
            id: true,
            username: true,
            passwordHash: true,
        },
        where: {
            username: username
        }
    })

    return row;
}

const findUserById = async (id) => {
    const row = await prisma.users.findFirst({
        select: {
            id: true,
            username: true,
            passwordHash: true,
        },
        where: {
            id: Number(id)
        }
    })

    return row;
}

module.exports = {
    createUser,
    finduserByName,
    findUserById
}

