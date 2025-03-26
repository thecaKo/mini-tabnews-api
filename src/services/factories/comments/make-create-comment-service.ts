import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { CreateComment } from "@/services/create-comment";

export function makeCreateCommentService() {
  const commentsRepository = new PrismaCommentsRepository();
  const createCommentService = new CreateComment(commentsRepository);

  return createCommentService;
}
