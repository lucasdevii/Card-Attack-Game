import { Server } from 'socket.io'

export let io

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('Usuário conectado')

        socket.on('disconnect', () => {
            console.log('Usuário desconectado');
        });
    })
}
