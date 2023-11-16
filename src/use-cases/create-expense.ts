import { Expense } from '@prisma/client'
import { ExpensesRepository } from '@/repositories/expenses-repository'
import { ExpenseAlreadyExistsError } from './errors/expense-already-exists-error'

interface expenseUseCaseRequest {
    description: string
    amount: number
    creditCardId: string
}

interface expenseUseCaseResponse{
  expense: Expense
}

export class CreateExpenseUseCase {
  constructor(private expensesRepository: ExpensesRepository) {}

  async handle({description, amount, creditCardId}: expenseUseCaseRequest): Promise<expenseUseCaseResponse> {

    const expenseAlreadyExists = await this.expensesRepository.findById(creditCardId)

    if (expenseAlreadyExists) {
      throw new ExpenseAlreadyExistsError()
    }
 
    const expense = await this.expensesRepository.create({description, amount, credit_card_id: creditCardId})

    return { expense }
  }
}

