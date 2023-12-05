import { ExpensesRepository } from '@/repositories/expenses-repository'
import { Charge } from '@prisma/client'

// Errors
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { InvalidExpenseIdError } from '../errors/invalid-expense-id-error'

// Interface
import { BatchPayload } from '@/@types/prisma-interfaces'
interface DeleteManyExpensesUseCaseRequest {
    userId: string
    expensesIds: string[]
}
interface DeleteManyExpensesUseCaseResponse{
    deletedExpensesNumber: BatchPayload
}

export class DeleteManyExpensesUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}
  async handle({userId, expensesIds}: DeleteManyExpensesUseCaseRequest): Promise<DeleteManyExpensesUseCaseResponse> {
    for (const expenseId of expensesIds) {
      const expenseExists = await this.expensesRepository.findById(expenseId)

      if (!expenseExists) {
        throw new InvalidExpenseIdError()
      }

      if (expenseExists && expenseExists.user_id !== userId) {
        throw new InvalidCredentialsError('Expense does not belong to the user.')
      }

    }

    const deletedExpensesNumber = await this.expensesRepository.deleteMany(expensesIds)
    
    return { deletedExpensesNumber }
  }
}