import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { CreatePostService } from "@/services/create-post";

export function makeCreatePostService() {
  const postsRepository = new PrismaPostRepository();
  const createPostService = new CreatePostService(postsRepository);

  return createPostService;
}
