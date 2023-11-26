import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EditExpenseUseCase } from '@/use-cases/expenses/edit-expense'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { CreditCardAlreadyExistsError } from '@/use-cases/errors/credit-card-already-exists-error'
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'


export async function editExpense(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    description: z.string().min(1).max(40),
    amount: z.number().min(0).max(1000000),
  })

  const { expenseId } = request.params as { expenseId: string }
  const { description, amount } = createCreditCardBodySchema.parse(request.body)

  try {
    const expensesRepository = new PrismaExpensesRepository()
    const editExpenseUseCase = new EditExpenseUseCase(expensesRepository)

    const { newExpense } = await editExpenseUseCase.handle({expenseId, description, amount})

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