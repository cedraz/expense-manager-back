import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface UpdatePasswordUseCaseRequest {
    userId: string
    password: string
}

interface UpdatePasswordUseCaseResponse{
    updatedUser: User
}

export class UpdatePasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({userId, password}: UpdatePasswordUseCaseRequest): Promise<UpdatePasswordUseCaseResponse> {

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new InvalidCredentialsError('Usuário não encontrado.')
    }

    const password_hash = await hash(password, 6)

    const updatedUser = await this.usersRepository.updatePassword({
      id: userId,
      password_hash
    })

    return {updatedUser}
  }
}

