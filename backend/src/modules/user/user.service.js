import { prisma } from "../../../prisma/client.js";

export const createUser = async (name, email, password) => {
    const userExists = await prisma.users.findUnique({ where: { email } });
    if (userExists) {
        const error = new Error('Email already in use');
        error.status = 400;
        throw error;
    }
    const user = await prisma.users.create({
        data: {
            name:name,
            email:email,
            password:password,
        }
    })
    return user
}