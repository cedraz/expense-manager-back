import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface VerifyCodeUseCaseRequest {
    email: string
    code: string
}

interface VerifyCodeUseCaseResponse{
    user: User
}

export class VerifyCodeUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ email, code }: VerifyCodeUseCaseRequest): Promise<VerifyCodeUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError('Usuário não encontrado.')
    }

    const resetPassCode = await this.usersRepository.findResetPassCode(user.id)

    if (!resetPassCode) {
      throw new InvalidCredentialsError('Código não existe.')
    }

    if (resetPassCode.expires_in.getTime() < new Date().getTime()){
      throw new InvalidCredentialsError('Código expirado.')
    }

    if (resetPassCode.code !== code) {
      throw new InvalidCredentialsError('Código inválido.')
    }

    return {user}
  }
}

