import { Prisma, Comment } from "@prisma/client";
import { CommentRepository } from "../comment-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCommentsRepository implements CommentRepository {
  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const comment = await prisma.comment.create({
      data,
    });

    return comment;
  }

  async update(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const comment = await prisma.comment.findUnique({ where: { id: data.id } });

    const updatedComment = await prisma.comment.update({ where: { id: comment?.id }, data });

    return updatedComment;
  }

  async delete(commentId: string): Promise<null> {
    await prisma.comment.delete({ where: { id: commentId } });

    return null;
  }

  async findById(commentId: string): Promise<Comment | null> {
    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    return comment;
  }

  async fetchManyByUserId(userId: string): Promise<Comment[] | null> {
    const comments = await prisma.comment.findMany({ where: { owner_id: userId } });

    return comments;
  }
}
