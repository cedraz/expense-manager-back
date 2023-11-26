import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/auth-middleware'

// Controllers
import { createExpense } from './create-expense'
import { editExpense } from './edit-expense'
import { deleteExpense } from './delete-expense'

export async function expenseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/expenses/:id', createExpense)
  app.put('/expenses/:expenseId', editExpense)
  app.delete('/expenses/:expenseId', deleteExpense)
}
