import { PrismaCommentsRepository } from "@/repositories/prisma/prisma-comments-repository";
import { UpdateCommentService } from "@/services/update-comment-by-id";

export function makeUpdateCommentService() {
  const prismaCommentsRepository = new PrismaCommentsRepository();
  const updateCommentService = new UpdateCommentService(prismaCommentsRepository);

  return updateCommentService;
}
