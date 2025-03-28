import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileByUserNameService } from "../../fetch-profile-by-username";

export function makeGetProfileByUserNameService() {
  const userRepository = new PrismaUserRepository();
  const getProfileByUserNameService = new GetProfileByUserNameService(userRepository);

  return getProfileByUserNameService;
}
