import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterService } from "../register";
import { GetAllUsers } from "../get-all-users";

export function makeGetAllUserProfile() {
  const userRepository = new PrismaUserRepository();
  const getAllUserProfileService = new GetAllUsers(userRepository);

  return getAllUserProfileService;
}
