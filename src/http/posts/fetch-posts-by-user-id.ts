import { makeFetchPostByUserIdService } from "@/services/factories/posts/make-fetch-posts-by-userid-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchManyByUserId(request: FastifyRequest, reply: FastifyReply) {
  const fetchManyByUserIdSchema = z.object({
    id: z.string(),
  });

  const { id } = fetchManyByUserIdSchema.parse(request.params);

  const fetchManyByUserId = makeFetchPostByUserIdService();

  const { posts } = await fetchManyByUserId.execute({
    userId: id,
  });

  return reply.status(200).send(posts);
}
