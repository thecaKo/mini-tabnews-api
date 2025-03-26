import { makeFetchCommentByUserIdService } from "@/services/factories/comments/make-fetch-comments-by-user-id-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchCommentsByUserId(request: FastifyRequest, reply: FastifyReply) {
  const userIdParamsBody = z.object({
    id: z.string(),
  });

  const { id } = userIdParamsBody.parse(request.params);

  const fetchCommentsByUserId = makeFetchCommentByUserIdService();
  const { comment: comments } = await fetchCommentsByUserId.execute({ ownerId: id });

  return reply.status(200).send({
    comments,
  });
}
