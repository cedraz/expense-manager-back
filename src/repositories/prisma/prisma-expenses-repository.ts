import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ExpensesRepository } from '@/repositories/expenses-repository'
import { UpdateExpenseData } from '@/@types/prisma-interfaces'

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

  async update({description, amount, expenseId}: UpdateExpenseData) {
    const currentExpense = await prisma.expense.findUnique({
      where: {
        id: expenseId
      }
    })

    if (!currentExpense) {
      return null
    }

    const expense = await prisma.expense.update({
      where: {
        id: expenseId
      },
      data: {
        description: description || currentExpense.description,
        amount: amount || currentExpense.amount
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

  async deleteMany(expensesIds: string[]): Promise<Prisma.BatchPayload> {
    const deletedExpenses = await prisma.expense.deleteMany({
      where: {
        id: {
          in: expensesIds
        }
      }
    })

    return deletedExpenses
  }
}
