import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreditCardAlreadyExistsError } from '@/use-cases/errors/credit-card-already-exists-error'
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'
import { CreateExpenseUseCase } from '@/use-cases/create-expense'
import { RequestParams } from '@/@types/params'
import { ExpenseAlreadyExistsError } from '@/use-cases/errors/expense-already-exists-error'

export async function createExpense(request: FastifyRequest, reply: FastifyReply) {
  const createCreditCardBodySchema = z.object({
    description: z.string().min(6).max(40),
    amount: z.number().min(0).max(10000),
  })
    
  const { id }: RequestParams = request.params as RequestParams
  const { description, amount } = createCreditCardBodySchema.parse(request.body)
  
  try {
    const expensesRepository = new PrismaExpensesRepository()
    const expenseUseCase = new CreateExpenseUseCase(expensesRepository)

    const { expense } = await expenseUseCase.handle({
      description, 
      amount,
      creditCardId: id
    })

    return reply.status(200).send(expense)
  } catch (error) {
    if (error instanceof ExpenseAlreadyExistsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}