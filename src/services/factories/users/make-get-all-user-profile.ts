import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetAllUsers } from "../../fetch-all-users";

export function makeGetAllUserProfile() {
  const userRepository = new PrismaUserRepository();
  const getAllUserProfileService = new GetAllUsers(userRepository);

  return getAllUserProfileService;
}
