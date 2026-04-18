import { prisma } from "../../../prisma/client.js";

export const createUser = async (name, email, password) => {
    try {
        await prisma.users.create({
            data: {
                name,
                email,
                password,
            }
        });
    } catch (error) {
        throw new Error("Error in the create user process");
    }
}