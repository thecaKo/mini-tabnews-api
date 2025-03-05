import { Prisma, Comment } from "@prisma/client";

export interface CommentRepository {
  create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment>;
  update(commentId: string, data: Prisma.CommentUncheckedUpdateInput): Promise<Comment | null>;
  delete(commentId: string): Promise<null>;
  findById(commentId: string): Promise<Comment | null>;
  fetchManyByUserId(userId: string): Promise<Comment[] | null>;
}
