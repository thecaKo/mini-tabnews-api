import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { UpdatePostService } from "@/services/update-post-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePostParamsSchema = z.object({
    id: z.string(),
  });

  const updatePostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
  });

  const prismaPostRepository = new PrismaPostRepository();
  const updatePostService = new UpdatePostService(prismaPostRepository);

  const { id } = updatePostParamsSchema.parse(request.params);

  const { content, title } = updatePostBodySchema.parse(request.body);

  const updatedPost = await updatePostService.execute({ userId: request.user.sub, title, content, postId: id });

  return reply.status(200).send({ updated_post: updatedPost });
}
