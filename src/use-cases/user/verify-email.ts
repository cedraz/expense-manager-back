import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface VerifyEmailUseCaseRequest {
    id: string
}

interface VerifyEmailUseCaseResponse{
    user: User
}

export class VerifyEmailUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ id }: VerifyEmailUseCaseRequest): Promise<VerifyEmailUseCaseResponse> {

    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new InvalidCredentialsError('Usuário não encontrado.')
    }

    const user = await this.usersRepository.verifyEmail(id)

    return {user}
  }
}

