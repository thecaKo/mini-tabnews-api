import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetProfileServiceRequest {
  username: string;
}

interface GetProfileServiceResponse {
  user: User;
}

export class GetProfileService {
  constructor(private userRepository: UsersRepository) {}
  async execute({ username }: GetProfileServiceRequest): Promise<GetProfileServiceResponse> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
