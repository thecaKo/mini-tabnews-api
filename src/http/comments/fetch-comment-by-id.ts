import { makeFetchCommentByIdService } from "@/services/factories/comments/make-fetch-comments-by-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchCommentById(request: FastifyRequest, reply: FastifyReply) {
  const commentIdParamsBody = z.object({
    id: z.string(),
  });

  const { id } = commentIdParamsBody.parse(request.params);

  const fetchCommentById = makeFetchCommentByIdService();

  const { comment } = await fetchCommentById.execute({ commentId: id });

  console.log(comment);

  return reply.status(200).send({
    comment,
  });
}
