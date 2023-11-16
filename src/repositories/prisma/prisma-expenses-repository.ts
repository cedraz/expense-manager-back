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
  
  async findById(id: string) {
    const expense = await prisma.expense.findUnique({
      where: {
        id
      }
    })
    
    return expense
  }
}
