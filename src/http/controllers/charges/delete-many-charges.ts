import { FastifyRequest, FastifyReply } from 'fastify'

// Repositories
import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository'

// Use cases
import { DeleteManyChargesUseCase } from '@/use-cases/charges/delete-many-charges'

// Errors 
import { InvalidChargeIdError } from '@/use-cases/errors/invalid-charge-id-error'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

// Zod
import { z } from 'zod'

export async function deleteManyCharges(request: FastifyRequest, reply: FastifyReply) {
  const deleteManyChargesBodySchema = z.object({
    chargesIds: z.array(z.string().uuid())
  })

  const { chargesIds } = deleteManyChargesBodySchema.parse(request.body)

  try {
    const chargesRepository = new PrismaChargesRepository()
    const deleteManyChargesUseCase = new DeleteManyChargesUseCase(chargesRepository)

    const { deletedChargesNumber } = await deleteManyChargesUseCase.handle({
      userId: request.user.sub,
      chargesIds: chargesIds
    })

    return reply.status(200).send({message: 'Charges deleted successfully', count: deletedChargesNumber.count})
  } catch (error) {
    if (error instanceof InvalidChargeIdError) {
      return reply.status(409).send({message: error.message})
    }

    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({message: error.message})
    }

    throw error
  }
}
