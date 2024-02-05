import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UpdateChargeUseCase } from '@/use-cases/charges/update-charge'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository'

export async function updateCharge(request: FastifyRequest, reply: FastifyReply) {
  const updateChargeBodySchema = z.object({
    description: z.string().min(1).max(40).optional(),
    amount: z.number().min(0).max(1000000).optional(),
  })

  const { chargeId } = request.params as { chargeId: string }
  const { description, amount } = updateChargeBodySchema.parse(request.body)

  try {
    const chargesRepository = new PrismaChargesRepository()
    const updateChargeUseCase = new UpdateChargeUseCase(chargesRepository)

    const { newCharge } = await updateChargeUseCase.handle({chargeId, description, amount})

    return reply.status(201).send(newCharge)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}