import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/auth-middleware'

// Controllers
import { createExpense } from './create-expense'
import { getExpenses } from './get-expenses'
import { editExpense } from './edit-expense'

export async function expenseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/expenses/:id', createExpense)
  app.get('/expenses/:creditCardId', getExpenses)
  app.put('/expenses/:expenseId', editExpense)
}
