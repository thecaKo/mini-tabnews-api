import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { FetchPostById } from "@/services/fetch-posts-by-id";
import { GetPostBySlugService } from "@/services/get-post-by-slug";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPostBySlug(request: FastifyRequest, reply: FastifyReply) {
  const findByIdParamsSchema = z.object({
    slug: z.string(),
  });

  const { slug } = findByIdParamsSchema.parse(request.params);

  const prismaPostRepository = new PrismaPostRepository();
  const getPostBySlugService = new GetPostBySlugService(prismaPostRepository);

  const { post } = await getPostBySlugService.execute({ slug });

  return reply.status(200).send({ post });
}
