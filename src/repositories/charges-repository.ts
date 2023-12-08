import { Charge, Prisma } from '@prisma/client'
import { chargesInterface } from '@/@types/prisma-interfaces'

export interface ChargesRepository {
    create(data: Prisma.ChargeUncheckedCreateInput): Promise<Charge>
    findById(id: string): Promise<Charge | null>
    findAll(userId: string): Promise<Charge[]>
    update(id: string, description: string): Promise<Charge>
    delete(id: string): Promise<Charge>
    deleteMany(ids: string[]): Promise<Prisma.BatchPayload>
}