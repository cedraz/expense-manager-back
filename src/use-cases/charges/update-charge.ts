import { Charge } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { ChargesRepository } from '@/repositories/charges-repository'

interface ChargeUseCaseRequest {
  chargeId: string
  description?: string
  amount?: number
}

interface ChargeUseCaseResponse{
  newCharge: Charge | null
}

export class UpdateChargeUseCase {
  constructor(private chargesRepository: ChargesRepository) {}

  async handle({chargeId, description, amount}: ChargeUseCaseRequest): Promise<ChargeUseCaseResponse> {
    const charge = await this.chargesRepository.findById(chargeId)

    if (!charge) {
      throw new InvalidCredentialsError('Cobrança não encontrado.')
    }

    const newCharge = await this.chargesRepository.update({description, amount, chargeId})
    
    return { newCharge }
  }
}

