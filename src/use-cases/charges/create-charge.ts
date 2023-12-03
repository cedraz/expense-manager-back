import { ChargesRepository } from '@/repositories/charges-repository'
import { Charge } from '@prisma/client'

interface CreateChargeUseCaseRequest {
    userId: string
    amount: number
    description: string
}

interface CreateChargeUseCaseResponse{
    charge: Charge
}

export class CreateChargeUseCase {
  constructor(private chargesRepository: ChargesRepository) {}
  async handle({userId, amount, description}: CreateChargeUseCaseRequest): Promise<CreateChargeUseCaseResponse> {
    const charge = await this.chargesRepository.create({description, amount, user_id: userId})
    
    return { charge }
  }
}