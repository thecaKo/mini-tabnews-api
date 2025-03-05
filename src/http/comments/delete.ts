import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { DeleteComment } from "@/services/delete-comment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const deleteCommentParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteCommentParamsSchema.parse(request.params);

  const prismaCommentsRepository = new PrismaCommentsRepository();
  const deleteCommentService = new DeleteComment(prismaCommentsRepository);

  await deleteCommentService.execute({
    commentId: id,
  });

  return reply.status(200).send({ message: "Comment deleted!" });
}
