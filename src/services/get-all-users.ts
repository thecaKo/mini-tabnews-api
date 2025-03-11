import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface GetAllServiceResponse {
  users: User[];
}

export class GetAllUsers {
  constructor(private userRepository: UsersRepository) {}

  async execute(): Promise<GetAllServiceResponse> {
    const users = await this.userRepository.getAllUsers();

    return { users };
  }
}
