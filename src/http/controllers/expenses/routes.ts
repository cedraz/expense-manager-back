import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/auth-middleware'

// Controllers
import { createExpense } from './create-expense'
import { updateExpense } from './update-expense'
import { deleteExpense } from './delete-expense'
import { deleteManyExpenses } from './delete-many-expenses'

export async function expenseRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/expenses/:creditCardId', createExpense)
  app.put('/expenses/:expenseId', updateExpense)
  app.delete('/expenses/:expenseId', deleteExpense)
  app.delete('/expenses', deleteManyExpenses)
}
