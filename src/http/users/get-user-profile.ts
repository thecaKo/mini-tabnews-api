import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { GetProfileService } from "@/services/get-profile";
import { FastifyReply, FastifyRequest } from "fastify";


export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const prismaUsersRepository = new PrismaUserRepository();
  const getProfileService = new GetProfileService(prismaUsersRepository);

  const user = await getProfileService.execute({ username: request.user.sub })

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined
    }
  })


}
