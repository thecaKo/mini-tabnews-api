import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { FetchCommentsByUserIdService } from "@/services/fetch-comments-by-user-id";

export function makeFetchCommentByUserIdService() {
  const prismaCommentsRepository = new PrismaCommentsRepository();
  const fetchCommentsByUserId = new FetchCommentsByUserIdService(prismaCommentsRepository);

  return fetchCommentsByUserId;
}
