import { finished } from "stream";
import { prisma } from "../../../database/prisma/client.js";

export const createMatch = async ( userId, opponentId, tx = prisma) => {
  try{  
    return await tx.matches.create({
      data: {
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
      },
      include: {
        players: {
          include: {
            user: {
              include: {
                users_cards: {
                  include: {
                    cards: true
                  }
                }
              }
            }
          }
        }
      }
    })
  }catch(error) {
    console.log(error);
    throw error;
  }
}
export const defineWinner = async (userId, roomId) => {
  await prisma.matches.update({
    where: {
      id: roomId
    },
    data: {
      winner: userId,
      finished: true
    }
  })
}