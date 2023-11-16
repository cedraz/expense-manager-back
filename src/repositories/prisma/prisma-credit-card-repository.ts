import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { CreditCardsRepository } from '../credit-cards-repository'

export class PrismaCreditCardRepository implements CreditCardsRepository {
  async create(data: Prisma.CreditCardUncheckedCreateInput) {
    const creditCard = await prisma.creditCard.create({
      data
    })
        
    return creditCard
  }

  async findByName(cardName: string) {
    const creditCard = await prisma.creditCard.findUnique({
      where: {
        card_name: cardName
      }
    })
    
    return creditCard
  }

  async findById(id: string) {
    const creditCard = await prisma.creditCard.findUnique({
      where: {
        id
      }
    })
    
    return creditCard
  }

  async findAll() {
    const creditCards = await prisma.creditCard.findMany({
      select: {
        id: true,
        card_name: true,
        user_id: false
      }
    })

    return creditCards
  }

  async update(id: string, cardName: string) {
    const creditCard = await prisma.creditCard.update({
      where: {
        id
      },
      data: {
        card_name: cardName
      }
    })

    return creditCard
  }
}
