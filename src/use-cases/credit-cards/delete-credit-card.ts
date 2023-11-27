import { CreditCardsRepository } from '@/repositories/credit-cards-repository'
import { CreditCard } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface CreditCardUseCaseRequest {
  id: string
}

interface CreditCardUseCaseResponse{
  deletedCreditCard: CreditCard
}

export class DeleteCreditCarduseCase {
  constructor(private creditCardsRepository: CreditCardsRepository) {}

  async handle({ id }: CreditCardUseCaseRequest): Promise<CreditCardUseCaseResponse> {
    
    const creditCard = await this.creditCardsRepository.findById(id)

    if (!creditCard) {
      throw new InvalidCredentialsError('Credit card not found')
    }

    const deletedCreditCard = await this.creditCardsRepository.delete(id)
  
    return { deletedCreditCard }
  }
}

