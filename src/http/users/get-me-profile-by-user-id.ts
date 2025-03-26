import { makeGetProfileByUserIdService } from "@/services/factories/users/make-get-profile-by-userid";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getProfileByUserId(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify();

  const getProfileByUserId = makeGetProfileByUserIdService();

  const { user } = await getProfileByUserId.execute({ id: request.user.sub });

  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined,
    },
  });
}
