import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { transporter } from '@/utils/mailer'

interface ForgotPasswordUseCaseRequest {
    email: string
}

interface ForgotPasswordUseCaseResponse{
    id: string
}

export class ForgotPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({email}: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)
    
    if (!user) {
      throw new InvalidCredentialsError('Usuário não encontrado.')
    }

    const resetPassCode = Math.floor(100000 + Math.random() * 900000).toString()

    transporter.sendMail({
      from: 'icaro <icarocedraz7@gmail.com>',
      to: `<${email}>`,
      subject: 'Reset your password',
      html: `Your reset code is: ${resetPassCode}`
    })

    const expiresIn = new Date(Date.now() + 5 * 60 * 1000)

    await this.usersRepository.updateResetPassCode({
      userId: user.id,
      code: resetPassCode,
      expiresIn
    })

    console.log('expires_in gerado: ', expiresIn.getTime())

    return {id: user.id}
  }
}

