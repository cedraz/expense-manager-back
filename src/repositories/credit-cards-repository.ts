import { CreditCard, Prisma } from '@prisma/client'
import { creditCardsInterface } from '@/@types/prisma-interfaces'

export interface CreditCardsRepository {
    create(data: Prisma.CreditCardUncheckedCreateInput): Promise<CreditCard>
    findByName(cardName: string): Promise<CreditCard | null>
    findById(id: string): Promise<CreditCard | null>
    findAll(): Promise<creditCardsInterface[]>
    update(id: string, cardName: string): Promise<CreditCard>
}