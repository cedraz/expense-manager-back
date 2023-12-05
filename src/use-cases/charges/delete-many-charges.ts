import { ChargesRepository } from '@/repositories/charges-repository'
import { Charge } from '@prisma/client'

// Errors
import { InvalidChargeIdError } from '@/use-cases/errors/invalid-charge-id-error'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { BatchPayload } from '@/@types/prisma-interfaces'

interface DeleteManyChargesUseCaseRequest {
    userId: string
    chargesIds: string[]
}

interface DeleteManyChargesUseCaseResponse{
    deletedChargesNumber: BatchPayload
}

export class DeleteManyChargesUseCase {
  constructor(private chargesRepository: ChargesRepository) {}
  async handle({userId, chargesIds}: DeleteManyChargesUseCaseRequest): Promise<DeleteManyChargesUseCaseResponse> {
    for (const chargeId of chargesIds) {
      const chargesExists = await this.chargesRepository.findById(chargeId)

      if (!chargesExists) {
        throw new InvalidChargeIdError()
      }

      if (chargesExists && chargesExists.user_id !== userId) {
        throw new InvalidCredentialsError('Charge does not belong to the user.')
      }
    }

    const deletedChargesNumber = await this.chargesRepository.deleteMany(chargesIds)
    
    return { deletedChargesNumber }
  }
}