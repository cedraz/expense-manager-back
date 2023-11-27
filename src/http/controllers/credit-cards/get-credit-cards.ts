import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'
import { GetCreditCardsUseCase } from '@/use-cases/credit-cards/get-credit-cards'


export async function getCreditCards(request: FastifyRequest, reply: FastifyReply) {
  const creditCardsRepository = new PrismaCreditCardRepository()
  const creditCardUseCase = new GetCreditCardsUseCase(creditCardsRepository)

  const userId = request.user.sub
  const {creditCards} = await creditCardUseCase.handle(userId)

  return reply.status(200).send(creditCards)
}