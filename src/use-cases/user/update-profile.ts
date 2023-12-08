import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface updateProfileInput {
  name: string | undefined
  email: string | undefined
}

interface UpdateProfileUseCaseRequest {
    userId: string
    data: updateProfileInput
}

interface UpdateProfileUseCaseResponse{
    updatedUser: User
}

export class UpdateProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({userId, data}: UpdateProfileUseCaseRequest): Promise<UpdateProfileUseCaseResponse> {

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new InvalidCredentialsError('User not found')
    }

    if (data.email && data.email !== user.email) {
      const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

      if (userAlreadyExists) {
        throw new UserAlreadyExistsError()
      }
    }

    const updatedUser = await this.usersRepository.update(userId, {
      name: data.name,
      email: data.email
    })

    return {updatedUser}
  }
}

