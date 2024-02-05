import { Prisma, User, ResetPassCode } from '@prisma/client'

export interface UsersRepository {
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>
    findById(id: string): Promise<User | null>
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>
    findResetPassCode(userId: string): Promise<ResetPassCode | null>
    updateResetPassCode({userId, code, expiresIn}: {userId: string, code: string, expiresIn: Date}): Promise<ResetPassCode>
    updatePassword({id, password_hash}: {id: string, password_hash: string}): Promise<User>
    verifyEmail(id: string): Promise<User>
}