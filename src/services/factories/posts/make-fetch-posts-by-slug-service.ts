import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { GetPostBySlugService } from "@/services/fetch-post-by-slug";

export function makeFetchPostBySlugService() {
  const prismaPostRepository = new PrismaPostRepository();
  const fetchPostBySlugService = new GetPostBySlugService(prismaPostRepository);

  return fetchPostBySlugService;
}
