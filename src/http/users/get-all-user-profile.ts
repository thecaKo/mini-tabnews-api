import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetAllUsers } from "@/services/get-all-users";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllUsers(_request: FastifyRequest, reply: FastifyReply) {
  const prismaUsersRepository = new PrismaUserRepository();
  const getAllUsersService = new GetAllUsers(prismaUsersRepository);

  const { users } = await getAllUsersService.execute();

  const usersWithoutPassword = users.map((user) => {
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return reply.status(200).send({
    users: usersWithoutPassword,
  });
}
