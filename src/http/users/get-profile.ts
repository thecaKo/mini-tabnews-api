import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileService } from "@/services/get-profile";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getProfileStats(request: FastifyRequest, reply: FastifyReply) {
  const userNameParams = z.object({
    user: z.string(),
  });

  const prismaUsersRepository = new PrismaUserRepository();
  const getProfileService = new GetProfileService(prismaUsersRepository);

  const { user } = userNameParams.parse(request.params);

  const userProfile = await getProfileService.execute({ username: user });

  return reply.status(200).send({
    user: {
      ...userProfile,
      password_hash: undefined,
    },
  });
}
