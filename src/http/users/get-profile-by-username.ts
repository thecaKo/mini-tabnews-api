import { makeGetProfileByUserNameService } from "@/services/factories/users/make-get-me-profile-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getProfileStats(request: FastifyRequest, reply: FastifyReply) {
  const userNameParams = z.object({
    user: z.string(),
  });

  const getProfileService = makeGetProfileByUserNameService();

  const { user } = userNameParams.parse(request.params);

  const userProfile = await getProfileService.execute({ username: user });

  return reply.status(200).send({
    ...userProfile,
    password_hash: undefined,
  });
}
