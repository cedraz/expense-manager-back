import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { LoginUseCase } from '@/use-cases/user/login'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { EmailNotVerifiedError } from '@/use-cases/errors/email-not-verified-error'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })
        
  const { email, password } = registerBodySchema.parse(request.body)
  
  try {
    const usersRepository = new PrismaUsersRepository()
    const loginUseCase = new LoginUseCase(usersRepository)

    const {user} = await loginUseCase.handle({
      email,
      password
    })

    const { password_hash: pass, ...userWithoutPass } = user

    const token = await reply.jwtSign({
      sub: user.id,
      iat: Date.now()
    })

    return reply.status(200).send({token, user: userWithoutPass})
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    if (error instanceof EmailNotVerifiedError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}