import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


describe("Show User Profile", () => {
  let createUserUseCase: CreateUserUseCase
  let showUserProfileUseCase: ShowUserProfileUseCase
  let inMemoryUsersRepository: InMemoryUsersRepository

  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository)
  })
  it("Should be able show an user", async () => {
    const user = await createUserUseCase.execute({
      email: 'test@test.com',
      name: 'test',
      password: '123'
    })
    const result = await showUserProfileUseCase.execute(user.id)
    expect(result).toHaveProperty('id')
  })
  it("Should not be able show an user not exists", async () => {
    expect(async () => {
      await createUserUseCase.execute({
        email: 'test@test.com',
        name: 'test',
        password: '123'
      })
      await showUserProfileUseCase.execute('fake-id')
    }).rejects.toBeInstanceOf(AppError)
  })
})
