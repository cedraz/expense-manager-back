// import { expect, it, describe } from 'vitest'
// import { RegisterUseCase } from '../src/use-cases/user/register'
// import { InMemoryUsersRepository } from './in-memory/in-memory-users-repository'
// import { UserAlreadyExistsError } from '../src/use-cases/errors/user-already-exists-error'

// describe('Register Use Case', () => {
//   it('should be able to register', async () => {
//     const usersRepository = new InMemoryUsersRepository()
//     const registerUseCase = new RegisterUseCase(usersRepository)

//     const {user} = await registerUseCase.handle({
//       name: 'Icaro',
//       email: 'icaro@gmail.com',
//       password: '123456'
//     })

//     expect(user.id).toEqual(expect.any(String))
//   })

//   it('should not be able to register with same email twice', async () => {
//     const usersRepository = new InMemoryUsersRepository()
//     const registerUseCase = new RegisterUseCase(usersRepository)

//     const email  = 'icaroteste@gmail.com'

//     await registerUseCase.handle({
//       name: 'Icaro',
//       email,
//       password: '123456'
//     })

//     expect(() => 
//       registerUseCase.handle({
//         name: 'Icaro',
//         email,
//         password: '123456'
//       })
//     ).rejects.toBeInstanceOf(UserAlreadyExistsError)

//   })
// })