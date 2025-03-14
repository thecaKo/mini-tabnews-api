import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileByUserNameService } from "@/services/get-profile-by-username";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const prismaUsersRepository = new PrismaUserRepository();
  const getProfileService = new GetProfileByUserNameService(prismaUsersRepository);

  const user = await getProfileService.execute({ username: request.user.username });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
