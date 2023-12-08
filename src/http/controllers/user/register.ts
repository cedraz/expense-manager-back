import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/user/register'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'


export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(4).max(20),
  })
    
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const {user} = await registerUseCase.handle({
      name,
      email,
      password
    })

    const { password_hash: pass, ...userWithoutPass } = user

    return reply.status(200).send(userWithoutPass)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }

    throw error
  }
}