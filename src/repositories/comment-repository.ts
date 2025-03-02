import { Prisma, Comment } from "@prisma/client";

export interface CommentRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
  update(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
  delete(commentId: string): Promise<null>;
  findById(commentId: string): Promise<Comment | null>;
  fetchManyByUserId(userId: string): Promise<Comment[] | null>;
  fetchCommentId(commentId: string): Promise<Comment>;
}
