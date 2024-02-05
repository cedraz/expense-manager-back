import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UpdateExpenseUseCase } from '@/use-cases/expenses/update-expense'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { CreditCardAlreadyExistsError } from '@/use-cases/errors/credit-card-already-exists-error'
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'


export async function updateExpense(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    description: z.string().min(1).max(40).optional(),
    amount: z.number().min(0).max(1000000).optional(),
  })

  const { expenseId } = request.params as { expenseId: string }
  const { description, amount } = createCreditCardBodySchema.parse(request.body)

  try {
    const expensesRepository = new PrismaExpensesRepository()
    const updateExpenseUseCase = new UpdateExpenseUseCase(expensesRepository)

    const { newExpense } = await updateExpenseUseCase.handle({expenseId, description, amount})

    return reply.status(201).send(newExpense)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }

    if (error instanceof CreditCardAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}