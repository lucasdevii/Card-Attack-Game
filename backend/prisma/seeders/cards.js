import cards from '../../src/mocks/cards.json' with { type: 'json' }
import { prisma } from '../client.js'

const main = async () => {
    await prisma.$transaction(async (tx) => {
        for(const card of cards){
            await tx.cards.upsert({
                where: {
                    id: card.id
                },
                update: {
                    name: card.name,
                    description: card.description,
                    image: card.image,
                    life: card.life,
                    attack: card.attack,
                    defense: card.defense,
                    cost: card.cost,
                },
                create: {
                    name: card.name,
                    description: card.description,
                    image: card.image,
                    life: card.life,
                    attack: card.attack,
                    defense: card.defense,
                    cost: card.cost,
                }
            })
        }
    })   
}
main().then(() => {
    console.log('Cards seed completed')
    process.exit(0)
}).catch((e) => {
    console.error(e)
    process.exit(1)
})