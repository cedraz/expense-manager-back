import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/auth-middleware'

// Controllers
import { createCreditCard } from './create-credit-card'
import { getCreditCards } from './get-credit-cards'
import { editCreditCard } from './edit-credit-card'
import { deleteCreditCard } from './delete-credit-card'

export async function creditCardRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/credit-cards', createCreditCard)
  app.get('/credit-cards', getCreditCards)
  app.put('/credit-cards/:id', editCreditCard)
  app.delete('/credit-cards/:id', deleteCreditCard)
}
