import { FastifyRequest, FastifyReply } from 'fastify'

// Repositories
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'

// Use cases
import { DeleteManyExpensesUseCase } from '@/use-cases/expenses/delete-many-expenses'

// Errors
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

// Zod
import { z } from 'zod'
import { InvalidExpenseIdError } from '@/use-cases/errors/invalid-expense-id-error'

export async function deleteManyExpenses(request: FastifyRequest, reply: FastifyReply) {
  const deleteManyExpensesBodySchema = z.object({
    expensesIds: z.array(z.string().uuid())
  })

  const { expensesIds } = deleteManyExpensesBodySchema.parse(request.body)

  try {
    const chargesRepository = new PrismaExpensesRepository()
    const deleteManyExpensesUseCase = new DeleteManyExpensesUseCase(chargesRepository)

    const { deletedExpensesNumber } = await deleteManyExpensesUseCase.handle({
      userId: request.user.sub,
      expensesIds: expensesIds
    })

    return reply.status(200).send({message: 'Charges deleted successfully', count: deletedExpensesNumber.count})
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({message: error.message})
    }

    if (error instanceof InvalidExpenseIdError) {
      return reply.status(400).send({message: error.message})
    }

    throw error
  }
}
