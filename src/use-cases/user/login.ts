import { UsersRepository } from '@/repositories/users-repository'
import { compare, hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { User } from '@prisma/client'
import { EmailNotVerifiedError } from '../errors/email-not-verified-error'

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
      throw new InvalidCredentialsError('Usuário não encontrado')
    }

    if (user.is_verified === false) {
      throw new EmailNotVerifiedError()
    }

    const doesPasswordMatchs = await compare(password, user.password_hash)

    if (!doesPasswordMatchs) {
      throw new InvalidCredentialsError('Credenciais inválidas')
    }
  
    return {user}
  }
}

