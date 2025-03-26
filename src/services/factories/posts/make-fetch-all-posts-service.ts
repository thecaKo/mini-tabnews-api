import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetAllPosts } from "@/services/fetch-all-posts";

export function makeFetchAllPostsService() {
  const prismaPostRepository = new PrismaPostRepository();
  const fetchAllPostService = new GetAllPosts(prismaPostRepository);

  return fetchAllPostService;
}
