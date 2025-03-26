import { makeUpdatePostService } from "@/services/factories/posts/make-update-post-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updatePostParamsSchema = z.object({
    id: z.string(),
  });

  const updatePostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
  });

  const updatePostService = makeUpdatePostService();

  const { id } = updatePostParamsSchema.parse(request.params);

  const { content, title } = updatePostBodySchema.parse(request.body);

  const updatedPost = await updatePostService.execute({ userId: request.user.sub, title, content, postId: id });

  return reply.status(200).send({ updated_post: updatedPost });
}
