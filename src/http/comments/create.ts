import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { CreateComment } from "@/services/create-comment";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCommentBodySchema = z.object({
    ownerId: z.string(),
    postId: z.string(),
    content: z.string(),
  });

  const { content, postId, ownerId } = createCommentBodySchema.parse(request.body);

  const prismaCommentsRepository = new PrismaCommentsRepository();
  const createCommentService = new CreateComment(prismaCommentsRepository);

  const { comment } = await createCommentService.execute({
    ownerId,
    postId,
    content,
  });

  return reply.status(201).send(comment);
}
