import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, password }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatch = await compare(password, user.password_hash);

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
