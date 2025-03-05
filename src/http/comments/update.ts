import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { UpdateCommentService } from "@/services/update-comment-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateCommentBodySchema = z.object({
    ownerId: z.string(),
    content: z.string(),
    postId: z.string(),
  });

  const updateCommentIdParamsSchema = z.object({
    id: z.string(),
  });

  const { content, postId, ownerId } = updateCommentBodySchema.parse(request.body);

  const { id } = updateCommentIdParamsSchema.parse(request.params);

  const prismaCommentsRepository = new PrismaCommentsRepository();
  const updateCommentService = new UpdateCommentService(prismaCommentsRepository);

  const { comment } = await updateCommentService.execute({ commentId: id, content, ownerId, postId });

  return reply.status(200).send(comment);
}
