import redisClient from "../../../database/redis.js";
import { getUserById } from "../user/user.service.js";
import { createMatch } from "./game.services.js"


export const gameSearch = async (req, res) => {
    const userId = req.user.id;

    const user = await getUserById(userId);

    //Logica do elo
    const usersSearching = await redisClient.zRangeWithScores("matchmaking", user.elo - 100, user.elo + 100)

    // Entra no if caso achar um outro usuário que esteja procurando matches
    if(usersSearching.length > 1){ 
        let bestUser = usersSearching[0].value == user.id ? usersSearching[1] : usersSearching[0];

        for(let i = 0; i < usersSearching.length; i++){

            if(usersSearching[i].value == user.id) continue;

            if(Math.abs((user.elo - usersSearching[i].score) > (user.elo - bestUser.score))){
                break
            }
            bestUser = usersSearching[i]

        }

        await redisClient.zRem()
        
        createMatch(user.id, Number(bestUser.value))
    }

    //Se não encontrar outro "matchmaker" de mesmo nivel vira um 

    await redisClient.zAdd("matchmaking", {
        score: user.elo,
        value: String(user.id)
    });

    return res.status(200).json({
        message: 'Procurando partida...'
    });
};

export const gameSearchStop = async (req, res) => {
    const userId = req.user.id;
    
    const exist = await redisClient.zRem(
        "matchmaking",
        String(userId)
    );

    if (exist) {
        return res.status(200).json({
            message: 'Retirado da lista de matchmaking.'
        });
    }

    return res.status(200).json({
        message: 'Usuário não encontrado na lista de matchmaking.'
    });
};