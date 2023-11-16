import { UsersRepository } from '@/repositories/users-repository'
import { compare, hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { User } from '@prisma/client'

interface LoginUseCaseRequest {
    email: string
    password: string
}

interface LoginUseCaseResponse{
  user: User
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({email, password}: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatchs = await compare(password, user.password_hash)

    if (!doesPasswordMatchs) {
      throw new InvalidCredentialsError()
    }
  
    return {user}
  }
}

