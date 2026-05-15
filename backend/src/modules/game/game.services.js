import { prisma } from "../../../database/prisma/client.js";

export const createMatch = async (userId, opponentId) => {
  try{  
    return await prisma.matches.create({
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
      }
    })
  }catch(error) {
    console.log(error);
    throw error;
  }
}