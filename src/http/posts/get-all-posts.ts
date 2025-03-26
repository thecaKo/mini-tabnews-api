import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllPosts } from "@/services/fetch-all-posts";

export async function getAllPosts(_request: FastifyRequest, reply: FastifyReply) {
  const prismaPostRepository = new PrismaPostRepository();
  const getAllPostService = new GetAllPosts(prismaPostRepository);

  const { posts } = await getAllPostService.execute();

  const postsWithoutPasswordHash = posts.map((post: any) => {
    if (post.user && post.user.password_hash) {
      const { password_hash, ...userWithoutPassword } = post.user;
      post.user = userWithoutPassword;
    }
    return post;
  });

  return reply.status(200).send({
    posts: postsWithoutPasswordHash,
  });
}
