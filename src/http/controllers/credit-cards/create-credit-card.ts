import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreditCardAlreadyExistsError } from '@/use-cases/errors/credit-card-already-exists-error'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'
import { CreditCardUseCase } from '@/use-cases/create-credit-card'


export async function createCreditCard(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    cardName: z.string().min(6).max(40),
  })
    
  const { cardName } = createCreditCardBodySchema.parse(request.body)
  
  try {
    const creditCardsRepository = new PrismaCreditCardRepository()
    const creditCardUseCase = new CreditCardUseCase(creditCardsRepository)

    const {creditCard} = await creditCardUseCase.handle({
      cardName,
      userId: request.user.sub
    })

    return reply.status(200).send(creditCard)
  } catch (error) {
    if (error instanceof CreditCardAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}