import { prisma } from "../../../database/prisma/client.js";
/**
  * Cria a partida na tabela relacional de matches 
  * @param {Number id 1} userId 
  * @param {Number id 2} opponentId 
  */
export const createMatch = async (userId, opponentId, roomUuid) => {
  await prisma.matches.create({
    data: {
      room_code: roomUuid,

      players: {
        create: [
          {
            user: {
              connect: {
                id: userId
              }
            }
          },
          {
            user: {
              connect: {
                id: opponentId
              }
            }
          }
        ]
      }
    }
  })
}