import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyCors from 'fastify-cors'

// Routes
import { userRoutes } from './http/controllers/users/routes'
import { creditCardRoutes } from './http/controllers/credit-cards/routes'
import { expenseRoutes } from './http/controllers/expenses/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(fastifyCors, {
  origin: true, // Ou '*' para permitir de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
})

app.register(userRoutes)
app.register(creditCardRoutes)
app.register(expenseRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({message: 'Validation error.', issues: error.format()})
  }

  if (env.NODE_ENV !== 'procuction') {
    console.error(error)
  }

  return reply.status(500).send({message: 'Internal server error.'})
})