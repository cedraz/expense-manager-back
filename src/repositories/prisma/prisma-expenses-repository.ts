import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ExpensesRepository } from '@/repositories/expenses-repository'

export class PrismaExpensesRepository implements ExpensesRepository {
  async create(data: Prisma.ExpenseUncheckedCreateInput) {
    const expense = await prisma.expense.create({
      data
    })
    
    return expense
  }

  async findAll(creditCardId: string) {
    const expenses = await prisma.expense.findMany({
      where: {
        credit_card_id: creditCardId
      }
    })
    
    return expenses
  }

  async findById(expenseId: string) {
    const expense = await prisma.expense.findUnique({
      where: {
        id: expenseId
      }
    })

    return expense
  }

  async update(description: string, amount: number, expenseId: string) {
    const expense = await prisma.expense.update({
      where: {
        id: expenseId
      },
      data:{
        description,
        amount
      }
    })

    return expense
  }
}
