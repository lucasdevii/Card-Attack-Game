import { Server } from 'socket.io'
import { matchMaking } from './handlers/matchMaking.handler.js';
import { isAuthWs } from './middleware.js';

export let io
export const usersOnline = new Map()

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    });

    io.use(isAuthWs);

    io.on('connection', (socket) => {

        console.log('Usuário conectado', socket.id ,'id', socket.user.id)
        usersOnline.set(socket.user.id , socket.id)

        // Listeners
        matchMaking(socket)


        socket.on('disconnect', () => {
            console.log('Usuário desconectado');
        });
    })
}
