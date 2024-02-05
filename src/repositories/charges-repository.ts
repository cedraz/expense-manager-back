import { Charge, Prisma } from '@prisma/client'
import { UpdateChargeData } from '@/@types/prisma-interfaces'

export interface ChargesRepository {
    create(data: Prisma.ChargeUncheckedCreateInput): Promise<Charge>
    findById(id: string): Promise<Charge | null>
    findAll(userId: string): Promise<Charge[]>
    update({chargeId, description, amount}: UpdateChargeData): Promise<Charge | null>
    delete(id: string): Promise<Charge>
    deleteMany(ids: string[]): Promise<Prisma.BatchPayload>
}