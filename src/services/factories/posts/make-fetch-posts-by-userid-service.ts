import { PrismaPostRepository } from "@/repositories/prisma/prisma-posts-repository";
import { FetchPostsByUserId } from "@/services/fetch-posts-by-user-id";

export function makeFetchPostByUserIdService() {
  const postsRepository = new PrismaPostRepository();
  const fetchPostsByUserId = new FetchPostsByUserId(postsRepository);

  return fetchPostsByUserId;
}
