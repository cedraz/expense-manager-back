import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/auth-middleware'

// Controllers
import { createCreditCard } from './create-credit-card'
import { getCreditCards } from './get-credit-cards'
import { editCreditCard } from './edit-credit-card'

export async function creditCardRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/credit-cards', createCreditCard)
  app.get('/credit-cards', getCreditCards)
  app.patch('/credit-cards/:id', editCreditCard)
}
