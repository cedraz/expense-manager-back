import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { VerifyCodeUseCase } from '@/use-cases/user/verify-code'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { z } from 'zod'

export async function verifyCode(request: FastifyRequest, reply: FastifyReply) {
  const codeBodySchema = z.object({
    code: z.string().length(6),
    email: z.string().email()
  })
    
  const { code, email } = codeBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const verifyCodeUseCase = new VerifyCodeUseCase(usersRepository)

    const {user} = await verifyCodeUseCase.handle({
      email,
      code
    })

    const token = await reply.jwtSign({
      sub: user.id,
      iat: Date.now()
    })
  
    return reply.status(200).send({token})
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}