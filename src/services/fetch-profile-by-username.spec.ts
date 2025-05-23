import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { it, expect, describe, beforeEach } from "vitest";
import { GetProfileByUserNameService } from "./fetch-profile-by-username";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let userRepository: InMemoryUsersRepository;
let sut: GetProfileByUserNameService;

describe("Get Profile Service Test", async () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new GetProfileByUserNameService(userRepository);
  });

  it("should be able to fetch an user profile", async () => {
    await userRepository.create({
      name: "cako",
      email: "fulano@gmail.com",
      password_hash: "123456",
    });

    const { user } = await sut.execute({
      username: "cako",
    });

    expect(user.name).toEqual(expect.any(String));
  });

  it("should not be able to fetch an user profile does not exits", async () => {
    await expect(() => sut.execute({ username: "cako" })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
