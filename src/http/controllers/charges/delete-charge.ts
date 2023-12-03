import { FastifyRequest, FastifyReply } from 'fastify'

// Repositories
import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository'

// Use cases
import { DeleteChargeUseCase } from '@/use-cases/charges/delete-charge'

// Errors 
import { InvalidChargeIdError } from '@/use-cases/errors/invalid-charge-id-error'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function deleteCharge(request: FastifyRequest, reply: FastifyReply) {
  const {chargeId} = request.params as {chargeId: string}

  try {
    const chargesRepository = new PrismaChargesRepository()
    const deleteChargeUseCase = new DeleteChargeUseCase(chargesRepository)

    const { charge } = await deleteChargeUseCase.handle({
      chargeId,
      userId: request.user.sub
    })

    return reply.status(200).send(charge)
  } catch (error) {
    if (error instanceof InvalidChargeIdError) {
      return reply.status(409).send({message: error.message})
    }

    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}
