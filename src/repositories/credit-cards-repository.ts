import { CreditCard, Prisma } from '@prisma/client'
import { creditCardsInterface } from '@/@types/prisma-interfaces'

export interface CreditCardsRepository {
    create(data: Prisma.CreditCardUncheckedCreateInput): Promise<CreditCard>
    findByName(cardName: string, userId: string): Promise<CreditCard | null>
    findById(id: string): Promise<CreditCard | null>
    findAll(userId: string): Promise<creditCardsInterface[]>
    update(id: string, cardName: string): Promise<CreditCard>
    delete(id: string): Promise<CreditCard>
}