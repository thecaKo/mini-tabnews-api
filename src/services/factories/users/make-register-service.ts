import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../../register";

export function makeRegisterService() {
  const userRepository = new PrismaUserRepository();
  const registerService = new RegisterService(userRepository);

  return registerService;
}
