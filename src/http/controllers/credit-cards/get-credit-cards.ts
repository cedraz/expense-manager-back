import { FastifyRequest, FastifyReply } from 'fastify'
import { CreditCardAlreadyExistsError } from '@/use-cases/errors/credit-card-already-exists-error'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'
import { GetCreditCardsUseCase } from '@/use-cases/get-credit-cards'


export async function getCreditCards(request: FastifyRequest, reply: FastifyReply) {
  const creditCardsRepository = new PrismaCreditCardRepository()
  const creditCardUseCase = new GetCreditCardsUseCase(creditCardsRepository)

  const {creditCards} = await creditCardUseCase.handle()

  return reply.status(200).send(creditCards)
}