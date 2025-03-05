import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { FetchPostsByUserId } from "@/services/fetch-posts-by-user-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchManyByUserId(request: FastifyRequest, reply: FastifyReply) {
  const fetchManyByUserIdSchema = z.object({
    id: z.string(),
  });

  const { id } = fetchManyByUserIdSchema.parse(request.params);

  const prismaPostRepository = new PrismaPostRepository();
  const fetchManyByUserId = new FetchPostsByUserId(prismaPostRepository);

  const { posts } = await fetchManyByUserId.execute({
    userId: id,
  });

  return reply.status(200).send(posts);
}
