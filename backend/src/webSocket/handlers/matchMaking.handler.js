import { getUserById } from "../../modules/user/user.service.js"
import asyncHandler from "../../middlewares/asyncHandler.js"
import redisClient from "../../../database/redis.js"


export const matchMaking = (socket) => {
    socket.on('search-game', asyncHandler(async () => {
        const userId = socket.user.id
        const user = await getUserById(userId)
        
        //Logica do elo
        const usersSearching = await redisClient.zRangeWithScores("matchmaking", user.elo - 100, user.elo + 100)

        // Entra no if não caso achar um outro usuário que esteja procurando matches
        if(usersSearching.length <= 1){ 
            await redisClient.zAdd("matchmaking", {
                score: user.elo,
                value: String(user.id)
            })
            console.log("Procurando partida...")
            return
        }
        
        //Se encontrar outros jogadores, fará uma escolha por rank mais proximo e criará a partida no bd
        let bestUser = usersSearching[0].value == user.id ? usersSearching[1] : usersSearching[0];

        for(let i = 0; i < usersSearching.length; i++){

            if(usersSearching[i].value == user.id) continue;
            
            if(Math.abs((user.elo - usersSearching[i].score) > (user.elo - bestUser.score))){
                break
            }
            bestUser = usersSearching[i]

        }

        await redisClient.zRem("matchmaking", bestUser.value);
        console.log("Os jogador " + user.name + " Jogará contra "+ bestUser.value)
    }))
}