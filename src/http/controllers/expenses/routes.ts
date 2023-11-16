import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/auth-middleware'

// Controllers
import { createExpense } from './create-expense'

export async function expenseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/expenses/:id', createExpense)
}
