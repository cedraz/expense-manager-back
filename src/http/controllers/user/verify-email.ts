import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { VerifyEmailUseCase } from '@/use-cases/user/verify-email'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function verifyEmail(request: FastifyRequest, reply: FastifyReply) {
    
  const userId = request.user.sub

  try {
    const usersRepository = new PrismaUsersRepository()
    const verifyEmailUseCase = new VerifyEmailUseCase(usersRepository)

    const {user} = await verifyEmailUseCase.handle({
      id: userId
    })

    const { password_hash: pass, ...userWithoutPass } = user

    return reply.status(200).send({verified: userWithoutPass.is_verified, message: 'Email verified'})    
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}