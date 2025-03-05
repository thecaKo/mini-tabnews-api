import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { FetchPostById } from "@/services/fetch-posts-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const findByIdParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = findByIdParamsSchema.parse(request.params);

  const prismaPostRepository = new PrismaPostRepository();
  const findByIdService = new FetchPostById(prismaPostRepository);

  const { post } = await findByIdService.execute({ postId: id });

  return post;
}
