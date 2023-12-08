import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'
import { EditCreditCarduseCase } from '@/use-cases/credit-cards/edit-credit-card'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { CreditCardAlreadyExistsError } from '@/use-cases/errors/credit-card-already-exists-error'


export async function editCreditCard(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    cardName: z.string().min(1).max(40)
  })

  const { id } = request.params as {id: string}
  const userId = request.user.sub
  const { cardName } = createCreditCardBodySchema.parse(request.body)

  try {
    const creditCardsRepository = new PrismaCreditCardRepository()
    const editCreditCardUseCase = new EditCreditCarduseCase(creditCardsRepository)

    const { newCreditCard } = await editCreditCardUseCase.handle({
      id,
      cardName,
      userId
    })

    return reply.status(200).send(newCreditCard)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    if (error instanceof CreditCardAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}