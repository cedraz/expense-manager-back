import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ForgotPasswordUseCase } from '@/use-cases/user/forgot-password'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function forgotPassword(request: FastifyRequest, reply: FastifyReply) {
  const forgotPasswordBodySchema = z.object({
    email: z.string().email(),
  })

  const { email } = forgotPasswordBodySchema.parse(request.body)
  
  try {
    const usersRepository = new PrismaUsersRepository()
    const forgotPasswordUseCase = new ForgotPasswordUseCase(usersRepository)

    const { id } = await forgotPasswordUseCase.handle({
      email,
    })

    return reply.status(200).send({userId: id})
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}