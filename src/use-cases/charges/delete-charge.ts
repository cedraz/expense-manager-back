import { ChargesRepository } from '@/repositories/charges-repository'
import { Charge } from '@prisma/client'

// Errors
import { InvalidChargeIdError } from '@/use-cases/errors/invalid-charge-id-error'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface DeleteChargeUseCaseRequest {
    userId: string
    chargeId: string
}

interface DeleteChargeUseCaseResponse{
    charge: Charge
}

export class DeleteChargeUseCase {
  constructor(private chargesRepository: ChargesRepository) {}
  async handle({userId, chargeId}: DeleteChargeUseCaseRequest): Promise<DeleteChargeUseCaseResponse> {
    const chargeExists = await this.chargesRepository.findById(chargeId)

    if (!chargeExists) {
      throw new InvalidCredentialsError('Cobrança não existe')
    }
    
    if (chargeExists) {
      if (chargeExists.user_id !== userId) {
        throw new InvalidChargeIdError()
      }
    }

    const charge = await this.chargesRepository.delete(chargeId)
    
    return { charge }
  }
}