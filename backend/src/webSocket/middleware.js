import jwt from 'jsonwebtoken';
import cookie from 'cookie';

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