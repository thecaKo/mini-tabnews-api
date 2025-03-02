import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlredyExistError } from "./errors/user-alredy-exists-error";
import { it, expect, describe, beforeEach } from "vitest";
import { RegisterService } from "./register";
import { compare } from "bcryptjs";

let userRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service Test", async () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new RegisterService(userRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hashed the user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register twice it the same email", async () => {
    await sut.execute({
      name: "fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "fulano",
        email: "fulano@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistError);
  });
});
