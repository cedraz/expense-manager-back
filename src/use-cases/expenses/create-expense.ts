import { Expense } from '@prisma/client'
import { ExpensesRepository } from '@/repositories/expenses-repository'
import { CreditCardsRepository } from '@/repositories/credit-cards-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface expenseUseCaseRequest {
    description: string
    amount: number
    creditCardId: string
}

interface expenseUseCaseResponse{
  expense: Expense
}

export class CreateExpenseUseCase {
  constructor(private expensesRepository: ExpensesRepository, private creditCardRepository: CreditCardsRepository) {}

  async handle({description, amount, creditCardId}: expenseUseCaseRequest): Promise<expenseUseCaseResponse> {

    const creditCard = await this.creditCardRepository.findById(creditCardId)

    if (!creditCard) {
      throw new InvalidCredentialsError('Credit card not found')
    }

    const expense = await this.expensesRepository.create({description, amount, credit_card_id: creditCardId})
    return { expense }
  }
}

