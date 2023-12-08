import { Expense } from '@prisma/client'
import { ExpensesRepository } from '@/repositories/expenses-repository'
import { CreditCardsRepository } from '@/repositories/credit-cards-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UsersRepository } from '@/repositories/users-repository'

interface expenseUseCaseRequest {
  userId: string
    description: string
    amount: number
    creditCardId: string
    userId: string
}

interface expenseUseCaseResponse{
  expense: Expense
}

export class CreateExpenseUseCase {
  constructor(private expensesRepository: ExpensesRepository, private creditCardRepository: CreditCardsRepository, private usersRepository: UsersRepository) {}
  async handle({userId, description, amount, creditCardId}: expenseUseCaseRequest): Promise<expenseUseCaseResponse> {
    const userExists = await this.usersRepository.findById(userId)
    const creditCard = await this.creditCardRepository.findById(creditCardId)

    if (!userExists) {
      throw new InvalidCredentialsError('User not found.')
    }

    if (!creditCard) {
      throw new InvalidCredentialsError('Credit card not found.')
    }

    const expense = await this.expensesRepository.create({user_id: userId, description, amount, credit_card_id: creditCardId})

    return { expense }
  }
}

