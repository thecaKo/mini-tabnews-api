import { makeFetchPostBySlugService } from "@/services/factories/posts/make-fetch-posts-by-slug-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPostBySlug(request: FastifyRequest, reply: FastifyReply) {
  const findByIdParamsSchema = z.object({
    slug: z.string(),
  });

  const { slug } = findByIdParamsSchema.parse(request.params);

  const fetchPostBySlugService = makeFetchPostBySlugService();

  const { post } = await fetchPostBySlugService.execute({ slug });

  return reply.status(200).send({ post });
}
