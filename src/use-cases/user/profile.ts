import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { User } from '@prisma/client'

interface ProfileUseCaseRequest {
    userId: string
}

interface ProfileUseCaseResponse{
    user: User
}

export class ProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({userId}: ProfileUseCaseRequest): Promise<ProfileUseCaseResponse> {

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new InvalidCredentialsError('Usuário não encontrado.')
    }

    return {user}
  }
}

