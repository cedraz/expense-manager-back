import { Expense, Prisma} from '@prisma/client'

export interface ExpensesRepository {
    create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>
    findById(expenseId: string): Promise<Expense | null>
    update(description: string, amount: number, expenseId: string): Promise<Expense>
    delete(expenseId: string): Promise<Expense>
    deleteMany(expensesIds: string[]): Promise<Prisma.BatchPayload>
}