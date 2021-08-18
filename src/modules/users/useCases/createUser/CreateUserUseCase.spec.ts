import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase"

describe('Create a user', () => {

  let createUserUseCase: CreateUserUseCase;
  let inMemoryUsersRepository: InMemoryUsersRepository;

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'Test',
      email: 'test@test.com.br',
      password: '12345'
    })

    expect(user).toHaveProperty('id')
  })

  it("should not be able create a new user with exists email", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: 'test@test.com.br',
        name: 'test',
        password: '1234'
      })
      await createUserUseCase.execute({
        email: 'test@test.com.br',
        name: 'test1',
        password: '1234'
      })
    }).rejects.toBeInstanceOf(AppError)
  })

})
