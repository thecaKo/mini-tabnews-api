import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { FetchCommentsByUserIdService } from "@/services/fetch-comments-by-user-id";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetchCommentsByUserId(request: FastifyRequest, reply: FastifyReply) {
  const userIdParamsBody = z.object({
    id: z.string(),
  });

  const { id } = userIdParamsBody.parse(request.params);

  const prismaCommentsRepository = new PrismaCommentsRepository();
  const fetchCommentsByUserId = new FetchCommentsByUserIdService(prismaCommentsRepository);

  const { comment: comments } = await fetchCommentsByUserId.execute({ ownerId: id });

  console.log(comments);

  return reply.status(200).send({
    comments,
  });
}
