import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { CreatePostService } from "@/services/create-post";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
  });

  let owner_id: string;

  const { title, content } = createPostBodySchema.parse(request.body);

  const token = request.cookies.refreshToken;

  if (!token) {
    return reply.status(401).send({ message: "Token não fornecido" });
  }

  try {
    const decoded: any = jwt.verify(token, env.JWT_SECRET);
    owner_id = decoded.sub;
  } catch (error) {
    return reply.status(401).send({ message: "Token inválido ou expirado" });
  }

  const prismaPostRepository = new PrismaPostRepository();
  const createPostService = new CreatePostService(prismaPostRepository);

  const { post } = await createPostService.execute({ owner_id, content, title });

  return reply.status(201).send({ post });
}
