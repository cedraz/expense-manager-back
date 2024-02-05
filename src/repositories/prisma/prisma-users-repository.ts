import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data
    })
    
    return user
  }
  
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })
    
    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    
    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        name: data.name || undefined,
        email: data.email || undefined
      }
    })
    
    return user
  }

  async findResetPassCode(userId: string) {
    const resetPassCode = await prisma.resetPassCode.findUnique({
      where: {
        user_id: userId
      }
    })
    
    return resetPassCode
  }

  async updateResetPassCode({userId, code, expiresIn}: {userId: string, code: string, expiresIn: Date}) {
    const resetPassCode = await prisma.resetPassCode.upsert({
      where: {
        user_id: userId
      },
      update: {
        code,
        expires_in: expiresIn
      },
      create: {
        user_id: userId,
        code,
        expires_in: expiresIn
      }
    })

    return resetPassCode
  }

  async updatePassword({id, password_hash}: {id: string, password_hash: string}) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        password_hash
      }
    })
    
    return user
  }

  async verifyEmail(id: string) {
    const user = await prisma.user.update({
      where: {
        id
      },
      data: {
        is_verified: true
      }
    })
    
    return user
  }
}
