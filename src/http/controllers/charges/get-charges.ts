import { FastifyRequest, FastifyReply } from 'fastify'

// Repositories
import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository'

import { GetChargesUseCase } from '@/use-cases/charges/get-charges'

export async function getCharges(request: FastifyRequest, reply: FastifyReply) {

  const chargesRepository = new PrismaChargesRepository()
  const getChargesUseCase = new GetChargesUseCase(chargesRepository)

  const { charges } = await getChargesUseCase.handle({userId: request.user.sub})

  return reply.status(200).send(charges)
}