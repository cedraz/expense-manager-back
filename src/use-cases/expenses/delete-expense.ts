import { expensesInterface } from '@/@types/prisma-interfaces'
import { ExpensesRepository } from '@/repositories/expenses-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface ExpenseUseCaseResponse {
  deletedExpense: expensesInterface
}

export class DeleteExpenseUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async handle(expenseId: string): Promise<ExpenseUseCaseResponse> {

    const expense = await this.expensesRepository.findById(expenseId)

    if (!expense) {
      throw new InvalidCredentialsError('Expense not found')
    }

    const deletedExpense = await this.expensesRepository.delete(expenseId)

    return { deletedExpense }
  }
}