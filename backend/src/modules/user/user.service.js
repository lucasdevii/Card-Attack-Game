import { prisma } from "../../../database/prisma/client.js";
import bcrypt from 'bcrypt';

export const createUser = async (name, email, password) => {
    return await prisma.$transaction(async (tx) => {
        const userExists = await tx.users.findUnique({ where: { email } });
        if (userExists) {
            const error = new Error('Email já está em uso');
            error.status = 400;
            throw error;
        }

        const passwordHashed = await bcrypt.hash(password, Number(process.env.BCRYPT_ROUNDS || 10));

        const user = await tx.users.create({
            data: {
                name:name,
                email:email,
                password:passwordHashed,
            }
        })

        await linkUserToCard(user.id, [1,2,3,4,5], tx);

        return user
    })
    
}

export const getUserByEmail = async (tx = prisma, email) => {
    const user = await tx.users.findUnique({ where: { email } });
    return user;
}

export const getUserById = async (tx = prisma, id) => {
    const user = await tx.users.findUnique({ where: { id }, 
        include: { users_cards: {
            include: { cards: true }
         } 
        } 
    });
    return user;
}

export const verifyExistingUser = async (email) => {
    const user = await prisma.users.findUnique({ where: { email } });
    return !!user;
}

export const passwordMatches = async (hashedPassword, password) => {
    const passwordIsIdentical = await bcrypt.compare(password, hashedPassword);
    return passwordIsIdentical;
}
/**
 * 
 * @param {Integer} userId 
 * @param {Array<Integer>} cardId 
 * @param {PrismaTransaction} tx
 */
export const linkUserToCard = async (userId, cardId, tx = prisma) => {
    const existingUser = await tx.users.findUnique({
        where: { id: userId }
    });

    if (!existingUser) {
        const error = new Error("Usuário não encontrado");
        error.status = 404;
        throw error;
    }

    const filteredCardIds = [...new Set(cardId)];

    const existingCards = await tx.cards.findMany({
        where: {
            id: {
                in: filteredCardIds
            }
        }
    });

    if (existingCards.length !== filteredCardIds.length) {
        const error = new Error("Um ou mais cartões não foram encontrados");
        error.status = 404;
        throw error;
    }

    await tx.users_cards.createMany({
        data: filteredCardIds.map((id) => ({
            user_id: userId,
            card_id: id
        })),
        skipDuplicates: true
    });
};

export const changeUserStatus = async (tx = prisma, userId, status) => {
    await tx.users.update({
        where: {
            id: userId
        },
        data: {
            status: status
        }
    })
}

export const shuffleCheap = (cheap) => { //Modern version of fisher yates
    for(let i = cheap.length - 1; i > 0; i--){
        const randomIndex = Math.floor(Math.random() * (i + 1))
        [cheap[i], cheap[randomIndex]] = [cheap[randomIndex], cheap[i]];
    }
    return cheap
}