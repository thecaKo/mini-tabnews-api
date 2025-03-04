import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { CreatePostService } from "@/services/create-post";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPostBodySchema = z.object({
    owner_id: z.string(),
    title: z.string(),
    content: z.string(),
  });

  const { title, content, owner_id } = createPostBodySchema.parse(request.body);

  const prismaPostRepository = new PrismaPostRepository();
  const createPostService = new CreatePostService(prismaPostRepository);

  const { post } = await createPostService.execute({ owner_id, content, title });

  return reply.status(201).send({ post: post });
}
