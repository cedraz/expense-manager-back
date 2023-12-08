import { FastifyInstance} from 'fastify'

// Controllers
import { register } from './register'
import { login } from './login'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/auth-middleware'
import { updateProfile } from './update-profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', login)

  // Define um escopo para as rotas que requerem o middleware
  app.register(async (scopedApp) => {
    // Adiciona o middleware ao escopo
    scopedApp.addHook('onRequest', verifyJWT)

    // Rotas dentro do escopo
    scopedApp.get('/profile', profile)
    scopedApp.put('/profile', updateProfile)
  })
}
