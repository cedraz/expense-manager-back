import { Expense, Prisma} from '@prisma/client'

export interface ExpensesRepository {
    create(data: Prisma.ExpenseUncheckedCreateInput): Promise<Expense>
    findById(id: string): Promise<Expense | null>
}