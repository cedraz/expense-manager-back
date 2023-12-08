import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { CreateExpenseUseCase } from '@/use-cases/expenses/create-expense'

// Repositories
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

// Error
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function createExpense(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    description: z.string().min(1).max(30),
    amount: z.number().min(0).max(1000000),
  })
    
  const { creditCardId } = request.params as {creditCardId: string}
  const { description, amount } = createCreditCardBodySchema.parse(request.body)
  
  try {
    const expensesRepository = new PrismaExpensesRepository()
    const creditCardsRepository = new PrismaCreditCardRepository()
    const usersRepository = new PrismaUsersRepository()
    const expenseUseCase = new CreateExpenseUseCase(expensesRepository, creditCardsRepository, usersRepository)

    const { expense } = await expenseUseCase.handle({
      description, 
      amount,
      creditCardId,
      userId: request.user.sub
    })

    return reply.status(200).send(expense)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}