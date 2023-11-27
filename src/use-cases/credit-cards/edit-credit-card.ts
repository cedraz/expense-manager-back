import { CreditCardsRepository } from '@/repositories/credit-cards-repository'
import { CreditCard } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { CreditCardAlreadyExistsError } from '../errors/credit-card-already-exists-error'

interface CreditCardUseCaseRequest {
  id: string
  cardName: string
  userId: string
}

interface CreditCardUseCaseResponse{
  newCreditCard: CreditCard
}

export class EditCreditCarduseCase {
  constructor(private creditCardsRepository: CreditCardsRepository) {}

  async handle({id, cardName, userId}: CreditCardUseCaseRequest): Promise<CreditCardUseCaseResponse> {
    
    const creditCard = await this.creditCardsRepository.findById(id)

    if (!creditCard) {
      throw new InvalidCredentialsError('Credit card not found')
    }

    const creditCardAlreadyExists = await this.creditCardsRepository.findByName(cardName, userId)

    if (creditCardAlreadyExists) {
      throw new CreditCardAlreadyExistsError()
    }

    const newCreditCard = await this.creditCardsRepository.update(id, cardName)
  
    return { newCreditCard }
  }
}

