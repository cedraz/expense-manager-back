import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { DeleteCreditCarduseCase } from '@/use-cases/credit-cards/delete-credit-card'


export async function deleteCreditCard(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string }

  try {
    const creditCardsRepository = new PrismaCreditCardRepository()
    const deleteCreditCardUseCase = new DeleteCreditCarduseCase(creditCardsRepository)

    const { deletedCreditCard } = await deleteCreditCardUseCase.handle({ id })

    return reply.status(200).send({message: 'Credit card deleted', creditCard: deletedCreditCard})
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}