import { prisma } from '@/lib/prisma'
import { Charge, Prisma } from '@prisma/client'
import { ChargesRepository } from '../charges-repository'

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

  async update(id: string, description: string) {
    const charge = await prisma.charge.update({
      where: {
        id
      },
      data: {
        description
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
