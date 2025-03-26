import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { DeleteComment } from "@/services/delete-comment";

export function makeDeleteCommentByIdService() {
  const commentsRepository = new PrismaCommentsRepository();
  const deleteCommentByIdService = new DeleteComment(commentsRepository);

  return deleteCommentByIdService;
}
