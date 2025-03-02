import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { UserAlredyExistError } from "./errors/user-alredy-exists-error";
import { it, expect, describe, beforeEach } from "vitest";
import { compare, hash } from "bcryptjs";
import { AuthenticateService } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let userRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate Service Test", async () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new AuthenticateService(userRepository);
  });

  it("should be able to authenticate", async () => {
    await userRepository.create({
      name: "fulano",
      email: "fulano@gmail.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "fulano@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong password", async () => {
    await userRepository.create({
      name: "fulano",
      email: "fulano@gmail.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "fulano@gmail.com",
        password: "1111111",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "Fulano@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
