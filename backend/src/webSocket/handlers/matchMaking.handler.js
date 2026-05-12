import crypto from 'crypto';
import redisClient from '../../../database/redis.js';

import { getUserById } from '../../modules/user/user.service.js';

import { usersOnline, io } from '../index.js';
import { asyncHandler } from '../middleware.js';

export const matchMaking = (socket) => {

    socket.on('search-game', asyncHandler(async () => {

        const userId = socket.user.id;

        const user = await getUserById(userId);

        // Busca jogadores próximos do elo
        const usersSearching =
            await redisClient.zRangeByScoreWithScores(
                'matchmaking',
                user.elo - 100,
                user.elo + 100
            );

        // Remove o próprio usuário
        const filteredUsers =
            usersSearching.filter(
                (player) =>
                    player.value !== String(user.id)
            );

        // Não encontrou ninguém
        if (filteredUsers.length === 0) {

            await redisClient.zAdd(
                'matchmaking',
                {
                    score: user.elo,
                    value: String(user.id)
                }
            );

            console.log('Procurando partida...');

            return;

        }

        // Escolhe o jogador mais próximo
        let bestUser = filteredUsers[0];

        for (let i = 1; i < filteredUsers.length; i++) {

            const currentUser = filteredUsers[i];

            const currentDiff = Math.abs(
                user.elo - currentUser.score
            );

            const bestDiff = Math.abs(
                user.elo - bestUser.score
            );

            // Como os resultados vêm ordenados,
            // se começou a piorar pode parar
            if (currentDiff > bestDiff) {
                break;
            }

            bestUser = currentUser;

        }

        // Remove ambos da fila
        await redisClient.zRem(
            'matchmaking',
            [
                String(bestUser.value),
                String(user.id)
            ]
        );

        // Busca socket do inimigo
        const enemySocketId =
            usersOnline.get(
                Number(bestUser.value)
            );

        if (!enemySocketId) {

            socket.emit('match-error', {
                message: 'Jogador desconectou'
            });

            return;

        }

        const enemySocket =
            io.sockets.sockets.get(
                enemySocketId
            );

        if (!enemySocket) {

            socket.emit('match-error', {
                message: 'Socket inválido'
            });

            return;

        }

        // Cria sala
        const roomId = crypto.randomUUID();

        // Adiciona os jogadores na room
        socket.join(roomId);

        enemySocket.join(roomId);

        // Emite para ambos
        io.to(roomId).emit(
            'match-found',
            {
                room_id: roomId,

                players: [
                    user.id,
                    Number(bestUser.value)
                ]
            }
        );

        console.log(
            `${user.name} enfrentará ${bestUser.value}`
        );

    }));

};