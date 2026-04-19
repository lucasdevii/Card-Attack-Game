import { prisma } from "../../../prisma/client.js";
import bcrypt from 'bcrypt';

export const createUser = async (name, email, password) => {
    const userExists = await prisma.users.findUnique({ where: { email } });
    if (userExists) {
        const error = new Error('Email já está em uso');
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

export const getUserByEmail = async (email) => {
    try {
        const user = await prisma.users.findUnique({ where: { email } });
        return user;
    }catch (error) {        
        console.error('Erro ao buscar usuário por email:', error);
        throw error;
    }

}

export const getUserById = async (id) => {
    try {
        const user = await prisma.users.findUnique({ where: { id } });
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        throw error;
    }
}

export const verifyExistingUser = async (email) => {
    try {
        const user = await prisma.users.findUnique({ where: { email } });
        return !!user;
    } catch (error) {
        console.error('Erro ao verificar usuário existente:', error);
        throw error;
    }
}

export const passwordMatches = async (hashedPassword, password) => {
    try{
        const passwordIsIdentical = await bcrypt.compare(password, hashedPassword);
        return passwordIsIdentical;
    } catch (error) {
        console.error('Erro ao comparar senhas:', error);
        throw error;
    }
}