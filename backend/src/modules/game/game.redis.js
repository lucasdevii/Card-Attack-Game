import redis from '../../../database/redis.js'

export const saveMatch = async (match) => {
    await redis.set(
        `match:${match.id}`,
        JSON.stringify({
            id: match.id,
            players: match.players,
            turn: match.players[0].user_id,
            timer: match.created_at,
        })
    )
    console.log("Criada room no redis")
    //match.players = 
    //{
    //  id1: {name: user.name, cards: [], life: user.life}  
    //  id2: ...
    //}
}
