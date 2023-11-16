import { CreditCardsRepository } from '@/repositories/credit-cards-repository'
import { creditCardsInterface } from '@/@types/prisma-interfaces'

interface CreditCardUseCaseResponse{
  creditCards: creditCardsInterface[]
}

export class GetCreditCardsUseCase {
  constructor(private creditCardsRepository: CreditCardsRepository) {}

  async handle(userId: string): Promise<CreditCardUseCaseResponse> {
    const creditCards = await this.creditCardsRepository.findAll(userId)
    return { creditCards }
  }
}

