import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { FetchCommentByIdService } from "@/services/fetch-comment-by-id";

export function makeFetchCommentByIdService() {
  const commentsRepository = new PrismaCommentsRepository();
  const fetchCommentByIdService = new FetchCommentByIdService(commentsRepository);

  return fetchCommentByIdService;
}
