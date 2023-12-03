import { ChargesRepository } from '@/repositories/charges-repository'
import { Charge } from '@prisma/client'

interface GetChargesUseCaseRequest {
    userId: string
}

interface GetChargesUseCaseResponse {
    charges: Charge[]
}

export class GetChargesUseCase {
  constructor(private chargesRepository: ChargesRepository) {}
  async handle({userId}: GetChargesUseCaseRequest): Promise<GetChargesUseCaseResponse> {
    const charges = await this.chargesRepository.findAll(userId)
        
    return { charges }
  }
}