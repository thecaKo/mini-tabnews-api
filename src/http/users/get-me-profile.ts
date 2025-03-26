import { makeGetProfileByUserNameService } from "@/services/factories/make-get-me-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getProfileService = makeGetProfileByUserNameService();
  const user = await getProfileService.execute({ username: request.user.username });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
