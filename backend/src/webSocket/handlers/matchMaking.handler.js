import crypto from 'crypto';
import redisClient from '../../../database/redis.js';

import { getUserById} from '../../modules/user/user.service.js';
import { usersOnline, io } from '../index.js';
import { asyncHandler, transactionHandler } from '../middleware.js';
import { createMatch } from '../../modules/game/game.services.js';
import { shuffleCheap } from '../../modules/card/card.service.js';
import { saveMatch } from '../../modules/game/game.redis.js'

export const matchMaking = (socket) => {

    socket.on('search-game', transactionHandler(async (tx) => {

        const userId = socket.user.id;

        const user = await getUserById(userId, tx);

        //Se o jogador n existir
        if(!user?.id){
            socket.emit('match-error', {
                message: 'Jogador não encontrado.'
            });

            return;
        }

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

            const currentDiff = Math.abs(user.elo - currentUser.score);

            const bestDiff = Math.abs(user.elo - bestUser.score);

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
                bestUser.value,
                String(user.id)
            ]
        );


        //Pegar infos do inimigo
        const enemy = await getUserById(Number(bestUser.value), tx)

        if(!enemy){
            
            socket.emit('match-error', {
                message: 'Erro ao buscar adversário.'
            });

            return;
        }

        //Embaralhar cartas
        let userCheap = JSON.parse(JSON.stringify(user.users_cards))
        shuffleCheap(userCheap);
        let enemyCheap = JSON.parse(JSON.stringify(user.users_cards))
        shuffleCheap(enemyCheap);

        // Busca socket do inimigo
        const enemySocketId =
            usersOnline.get(Number(bestUser.value));

        if (!enemySocketId) {

            socket.emit('match-error', {
                message: 'Adversário desconectou.'
            });

            return;

        }
        

        const enemySocket =
            io.sockets.sockets.get(enemySocketId);

        if (!enemySocket) {

            socket.emit('match-error', {
                message: 'Erro de conexão.'
            });

            return;

        }
        const room = await createMatch(user.id, enemy.id, tx)
        const roomId = room.room_code

        

        if(!roomId){
            
            socket.emit('match-error', {
                message: 'Erro na criação da partida'
            });

            return;
        }

        // Adiciona os jogadores na room
        socket.join(roomId);

        enemySocket.join(roomId);

        await saveMatch(room)
        // Emite para ambos
        io.to(roomId).emit(
            'match-found',
            {
                room: room,
            }
        );
    }));

};