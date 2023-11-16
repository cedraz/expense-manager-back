import { FastifyRequest, FastifyReply } from 'fastify'
import { GetExpensesUseCase } from '@/use-cases/get-expenses'
import { PrismaExpensesRepository } from '@/repositories/prisma/prisma-expenses-repository'
import { PrismaCreditCardRepository } from '@/repositories/prisma/prisma-credit-card-repository'


export async function getExpenses(request: FastifyRequest, reply: FastifyReply) {
  const expensesRepository = new PrismaExpensesRepository()
  const creditCardRepository = new PrismaCreditCardRepository()
  const getExpensesUseCase = new GetExpensesUseCase(expensesRepository, creditCardRepository)

  const { creditCardId } = request.params as { creditCardId: string }

  const {expenses} = await getExpensesUseCase.handle(creditCardId)

  return reply.status(200).send(expenses)
}