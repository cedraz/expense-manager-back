import { Expense, Prisma} from '@prisma/client'
import { UpdateExpenseData } from '@/@types/prisma-interfaces'

export interface ExpensesRepository {
    create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>
    findById(expenseId: string): Promise<Expense | null>
    update({description, amount, expenseId}: UpdateExpenseData): Promise<Expense | null>
    delete(expenseId: string): Promise<Expense>
    deleteMany(expensesIds: string[]): Promise<Prisma.BatchPayload>
}