import { makeGetAllUserProfile } from "@/services/factories/make-get-all-user-profile";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAllUsers(_request: FastifyRequest, reply: FastifyReply) {
  const getAllUsersService = makeGetAllUserProfile();

  const { users } = await getAllUsersService.execute();

  const usersWithoutPassword = users.map((user) => {
    const { password_hash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return reply.status(200).send({
    users: usersWithoutPassword,
  });
}
