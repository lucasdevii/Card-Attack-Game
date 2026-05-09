import redisClient from "../../../database/redis.js";
import { getUserById } from "../user/user.service.js";

export const gameSearch = async (req, res) => {
    const userId = req.user.id;
    const user = await getUserById(userId)
    // Adiciona o usuário à lista de busca de jogo no Redis
    await redisClient.zAdd("matchmakink", {
        score: user.elo,
        value: user.id
    },)

    return res.status(200).json({ message: 'Procurando partida...' });
}
export const gameSearchStop = async (req, res) => {
    const userId = req.user.id;

    const exist = await radisCliend.zRem("matchmaking", userId);
    if(exist){
        return res.status(200).json({message: 'Retirado da lista de matchMaking.'})
    }
        return res.status(404).json({message: "Usuário não encontrado na lista de matchMaking."})

}