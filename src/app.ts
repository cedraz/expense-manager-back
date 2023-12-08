import fastify, { FastifyReply } from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import { env } from './env'
import cors from '@fastify/cors'

// Routes
import { userRoutes } from './http/controllers/user/routes'
import { creditCardRoutes } from './http/controllers/credit-cards/routes'
import { expenseRoutes } from './http/controllers/expenses/routes'
import { chargeRoutes } from './http/controllers/charges/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET
})

app.register(cors, {
  origin: true, // Ou '*' para permitir de qualquer origem
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
})

app.register(userRoutes)
app.register(creditCardRoutes)
app.register(expenseRoutes)
app.register(chargeRoutes)

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
    return
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  reply.status(500).send({ message: 'Internal server error.' })
})
