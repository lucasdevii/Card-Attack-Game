import {prisma} from "../../prisma/client.js";

const createUser = async (name, email, password, passwordConfirmation) => {
    try {
        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation
            }
        });
    } catch (error) {
        throw new Error("Error in the create user process");
    }
}