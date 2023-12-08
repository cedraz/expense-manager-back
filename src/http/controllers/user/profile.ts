import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ProfileUseCase } from '@/use-cases/user/profile'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  const userId = request.user.sub

  try {
    const usersRepository = new PrismaUsersRepository()
    const profileUseCase = new ProfileUseCase(usersRepository)

    const {user} = await profileUseCase.handle({userId})

    const { password_hash: pass, ...userWithoutPass } = user

    return reply.status(200).send(userWithoutPass)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}