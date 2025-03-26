import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { FetchPostById } from "@/services/fetch-posts-by-id";

export function makeFetchPostByIdService() {
  const postsRepository = new PrismaPostRepository();
  const fetchPostsById = new FetchPostById(postsRepository);

  return fetchPostsById;
}
