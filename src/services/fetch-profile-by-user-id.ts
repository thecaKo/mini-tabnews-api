import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

type UserWithoutPassword = Omit<User, "password_hash">;

interface GetProfileServiceRequest {
  id: string;
}

interface GetProfileServiceResponse {
  user: UserWithoutPassword;
}

export class GetProfileByUserId {
  constructor(private userRepository: UsersRepository) {}

  async execute({ id }: GetProfileServiceRequest): Promise<GetProfileServiceResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    const { password_hash, ...userWithoutPassword } = user;

    return { user: userWithoutPassword };
  }
}
