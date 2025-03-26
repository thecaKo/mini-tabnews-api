import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchAllPostsService } from "@/services/factories/posts/make-fetch-all-posts-service";

export async function getAllPosts(_request: FastifyRequest, reply: FastifyReply) {
  const getAllPostService = makeFetchAllPostsService();

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
