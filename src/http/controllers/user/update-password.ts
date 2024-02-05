import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdatePasswordUseCase } from '@/use-cases/user/update-password'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { z } from 'zod'

export async function updatePassword(request: FastifyRequest, reply: FastifyReply) {
  const updatePasswordBodySchema = z.object({
    password: z.string().min(4).max(20)
  })

  const userId = request.user.sub

  const { password } = updatePasswordBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository)

    const { updatedUser } = await updatePasswordUseCase.handle({
      userId,
      password
    })

    const { password_hash: pass, ...userWithoutPass } = updatedUser

    return reply.status(200).send(userWithoutPass)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}