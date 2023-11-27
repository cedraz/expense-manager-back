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

  async delete(expenseId: string) {
    const expense = await prisma.expense.delete({
      where: {
        id: expenseId
      }
    })

    return expense
  }
}
