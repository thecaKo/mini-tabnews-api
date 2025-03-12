import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileByUserId } from "@/services/get-profile-by-user-id";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfileByUserId(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const prismaUsersRepository = new PrismaUserRepository();
  const getProfileByUserId = new GetProfileByUserId(prismaUsersRepository);

  const { user } = await getProfileByUserId.execute({ id: request.user.sub });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
