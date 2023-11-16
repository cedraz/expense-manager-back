
import { expensesInterface } from '@/@types/prisma-interfaces'
import { CreditCardsRepository } from '@/repositories/credit-cards-repository'
import { ExpensesRepository } from '@/repositories/expenses-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface ExpenseUseCaseResponse{
  expenses: expensesInterface[]
}

export class GetExpensesUseCase {
  constructor(private expensesRepository: ExpensesRepository, private creditCardRepository: CreditCardsRepository) {}

  async handle(creditCardId: string): Promise<ExpenseUseCaseResponse> {

    const creditCard = await this.creditCardRepository.findById(creditCardId)

    if (!creditCard) {
      throw new InvalidCredentialsError()
    }

    const expenses = await this.expensesRepository.findAll(creditCardId)
    return { expenses }
  }
}

