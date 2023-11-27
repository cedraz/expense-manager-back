import { FastifyRequest, FastifyReply } from 'fastify'
import { DeleteExpenseUseCase} from '@/use-cases/expenses/delete-expense'
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'


export async function deleteExpense(request: FastifyRequest, reply: FastifyReply) {
  const { expenseId } = request.params as { expenseId: string }

  try {
    const expensesRepository = new PrismaExpensesRepository()
    const getExpensesUseCase = new DeleteExpenseUseCase(expensesRepository)

    const { deletedExpense } = await getExpensesUseCase.handle(expenseId)

    return reply.status(200).send({message: 'Expense deleted', expense: deletedExpense})
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({message: error.message})
    }
  
    throw error
  }
}