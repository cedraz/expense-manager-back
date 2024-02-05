import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ChargesRepository } from '../charges-repository'
import { UpdateChargeData } from '@/@types/prisma-interfaces'

export class PrismaChargesRepository implements ChargesRepository {
  async create(data: Prisma.ChargeUncheckedCreateInput) {
    const charge = await prisma.charge.create({
      data
    })
        
    return charge
  }

  async findById(id: string) {
    const charge = await prisma.charge.findUnique({
      where: {
        id
      }
    })
    
    return charge
  }

  async findAll(userId: string) {
    const charges = await prisma.charge.findMany({
      where: {
        user_id: userId
      }
    })
      
    return charges
  }

  async update({chargeId, description, amount}: UpdateChargeData) {
    const currentCharge = await prisma.charge.findUnique({
      where: {
        id: chargeId
      }
    })

    if (!currentCharge) {
      return null
    }

    const charge = await prisma.charge.update({
      where: {
        id: chargeId
      },
      data: {
        description: description || currentCharge.description,
        amount: amount || currentCharge.amount
      }
    })

    return charge
  }

  async delete(id: string) {
    const charge = await prisma.charge.delete({
      where: {
        id
      }
    })

    return charge
  }

  async deleteMany(ids: string[]) {
    const deletedChargesNumber = await prisma.charge.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })

    return deletedChargesNumber
  }
}
