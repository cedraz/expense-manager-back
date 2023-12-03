import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RequestParams } from '@/@types/params'

// Repositories
import { PrismaChargesRepository } from '@/repositories/prisma/prisma-charges-repository'

import { CreateChargeUseCase } from '@/use-cases/charges/create-charge'

export async function createCharge(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    description: z.string().min(1).max(30),
    amount: z.number().min(0).max(1000000),
  })
  
  const { description, amount } = createCreditCardBodySchema.parse(request.body)
  
  const chargesRepository = new PrismaChargesRepository()
  const createChargeUseCase = new CreateChargeUseCase(chargesRepository)

  const { charge } = await createChargeUseCase.handle({
    description, 
    amount,
    userId: request.user.sub
  })

  return reply.status(200).send(charge)
}