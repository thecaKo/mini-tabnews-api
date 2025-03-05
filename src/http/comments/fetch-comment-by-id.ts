import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { FetchCommentByIdService } from "@/services/fetch-comment-by-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchCommentById(request: FastifyRequest, reply: FastifyReply) {
  const commentIdParamsBody = z.object({
    id: z.string(),
  });

  const { id } = commentIdParamsBody.parse(request.params);

  const prismaCommentsRepository = new PrismaCommentsRepository();
  const fetchCommentById = new FetchCommentByIdService(prismaCommentsRepository);

  const { comment } = await fetchCommentById.execute({ commentId: id });

  console.log(comment);

  return reply.status(200).send({
    comment,
  });
}
