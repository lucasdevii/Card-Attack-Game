import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { prisma } from '../../database/prisma/client.js';

export const isAuthWs = ( socket, next ) => {

    try {
        const rawCookies =
            socket.handshake.headers.cookie;

        if (!rawCookies) {
            return next(
                new Error('Unauthorized')
            );
        }

        const cookies = cookie.parse(rawCookies);

        const token = cookies.token;

        if (!token) {
            return next(
                new Error('Unauthorized')
            );
        }

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        socket.user = payload;

        next();

    } catch {

        next(
            new Error('Unauthorized')
        );

    }

};

export const asyncHandler = (handler) => {
    return async (...args) => {
        try {
            await handler(...args);
        } catch (err) {
            console.error(err);
        }
    };
}

export const transactionHandler = (handler) => {
    return async (...args) => {
        try{
            return await prisma.$transaction(
                async (tx) => {
                    return await handler(
                        tx,
                        ...args
                    );
                }
            );
        }catch(err){
            console.log(err)
        }
    }
}