import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { DeletePostService } from "@/services/delete-post";

export function makeDeletePostService() {
  const postsRepository = new PrismaPostRepository();
  const deletePostService = new DeletePostService(postsRepository);

  return deletePostService;
}
