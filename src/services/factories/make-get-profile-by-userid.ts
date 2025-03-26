import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileByUserId } from "../get-profile-by-user-id";

export function makeGetProfileByUserIdService() {
  const userRepository = new PrismaUserRepository();
  const getProfileByUserIdService = new GetProfileByUserId(userRepository);

  return getProfileByUserIdService;
}
