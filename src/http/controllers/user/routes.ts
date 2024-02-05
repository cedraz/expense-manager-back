import { FastifyInstance} from 'fastify'

// Controllers
import { register } from './register'
import { login } from './login'
import { profile } from './profile'
import { forgotPassword } from './forgot-password'
import { updateProfile } from './update-profile'
import { verifyEmail } from './verify-email'
import { verifyJWT } from '@/http/middlewares/auth-middleware'
import { verifyCode } from './verify-code'
import { updatePassword } from './update-password'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', login)
  app.post('/forgot-password', forgotPassword)
  app.post('/verify-code', verifyCode)

  // Define um escopo para as rotas que requerem o middleware
  app.register(async (scopedApp) => {
    // Adiciona o middleware ao escopo
    scopedApp.addHook('onRequest', verifyJWT)

    // Rotas dentro do escopo
    scopedApp.get('/profile', profile)
    scopedApp.put('/profile', updateProfile)
    scopedApp.get('/verify-email', verifyEmail)
    scopedApp.post('/update-password', updatePassword)
  })
}
