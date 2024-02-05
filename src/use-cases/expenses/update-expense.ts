import { Expense } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { ExpensesRepository } from '@/repositories/expenses-repository'

interface ExpenseUseCaseRequest {
  expenseId: string
  description?: string
  amount?: number
}

interface ExpenseUseCaseResponse{
  newExpense: Expense | null
}

export class UpdateExpenseUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async handle({expenseId, description, amount}: ExpenseUseCaseRequest): Promise<ExpenseUseCaseResponse> {
    const expense = await this.expensesRepository.findById(expenseId)

    if (!expense) {
      throw new InvalidCredentialsError('Despesa não encontrada.')
    }

    const newExpense = await this.expensesRepository.update({description, amount, expenseId})
    
    return { newExpense }
  }
}

