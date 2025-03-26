import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { UpdatePostService } from "@/services/update-post-by-id";

export function makeUpdatePostService() {
  const postsRepository = new PrismaPostRepository();
  const updatePostService = new UpdatePostService(postsRepository);

  return updatePostService;
}
