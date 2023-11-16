import { CreditCardsRepository } from '@/repositories/credit-cards-repository'
import { CreditCard } from '@prisma/client'
import { CreditCardAlreadyExistsError } from './errors/credit-card-already-exists-error'

interface CreditCardUseCaseRequest {
    userId: string
  cardName: string
}

interface CreditCardUseCaseResponse{
  creditCard: CreditCard
}

export class CreditCardUseCase {
  constructor(private creditCardsRepository: CreditCardsRepository) {}

  async handle({userId, cardName}: CreditCardUseCaseRequest): Promise<CreditCardUseCaseResponse> {
    const creditCardWithSameName = await this.creditCardsRepository.findByName(cardName)
    
    if (creditCardWithSameName) {
      throw new CreditCardAlreadyExistsError()
    }

    const creditCard = await this.creditCardsRepository.create({card_name: cardName, user_id: userId})

    return { creditCard }
  }
}

