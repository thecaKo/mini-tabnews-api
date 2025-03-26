import { makeDeleteCommentByIdService } from "@/services/factories/comments/make-delete-comment-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteComment(request: FastifyRequest, reply: FastifyReply) {
  const deleteCommentParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = deleteCommentParamsSchema.parse(request.params);

  const deleteCommentService = makeDeleteCommentByIdService();

  await deleteCommentService.execute({
    commentId: id,
  });

  return reply.status(200).send({ message: "Comment deleted!" });
}
