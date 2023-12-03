import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/auth-middleware'

// Controllers
import { createCharge } from './create-charge'
import { getCharges } from './get-charges'
import { deleteCharge } from './delete-charge'

export async function chargeRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/charges', getCharges)
  app.post('/charges', createCharge)
  app.delete('/charges/:chargeId', deleteCharge)
}
