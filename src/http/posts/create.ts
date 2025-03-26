import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { makeCreatePostService } from "@/services/factories/posts/make-create-posts-service";

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

  const createPostService = makeCreatePostService();

  const { post } = await createPostService.execute({ owner_id, content, title });

  return reply.status(201).send({ post });
}
