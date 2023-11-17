import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RequestParams } from '@/@types/params'

import { CreateExpenseUseCase } from '@/use-cases/create-expense'

// Repositories
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'

// Error
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function createExpense(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    description: z.string().min(4).max(26),
    amount: z.number().min(0).max(10000),
  })
    
  const { id }: RequestParams = request.params as RequestParams
  const { description, amount } = createCreditCardBodySchema.parse(request.body)
  
  try {
    const expensesRepository = new PrismaExpensesRepository()
    const creditCardsRepository = new PrismaCreditCardRepository()
    const expenseUseCase = new CreateExpenseUseCase(expensesRepository, creditCardsRepository)

    const { expense } = await expenseUseCase.handle({
      description, 
      amount,
      creditCardId: id
    })

    return reply.status(200).send(expense)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}