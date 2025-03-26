import { makeFetchPostByIdService } from "@/services/factories/posts/make-fetch-by-id-posts-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const findByIdParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = findByIdParamsSchema.parse(request.params);

  const findByIdService = makeFetchPostByIdService();

  const { post } = await findByIdService.execute({ postId: id });

  return reply.status(200).send({ post });
}
