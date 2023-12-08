import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateProfileUseCase } from '@/use-cases/user/update-profile'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function updateProfile(request: FastifyRequest, reply: FastifyReply) {
  const updateProfileBodySchema = z.object({
    name: z.string().min(1).max(50).optional(),
    email: z.string().email().optional()
  })

  const userId = request.user.sub

  const { name, email } = updateProfileBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const updateProfileUseCase = new UpdateProfileUseCase(usersRepository)

    const { updatedUser } = await updateProfileUseCase.handle({
      userId,
      data: {
        name,
        email
      }
    })

    const { password_hash: pass, ...userWithoutPass } = updatedUser

    return reply.status(200).send(userWithoutPass)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}