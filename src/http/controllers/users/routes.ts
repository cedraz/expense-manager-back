import { FastifyInstance} from 'fastify'

// Controllers
import { register } from './register'
import { login } from './login'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/login', login)
}
