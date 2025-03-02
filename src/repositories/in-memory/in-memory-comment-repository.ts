import { Prisma, Comment } from "@prisma/client";
import { CommentRepository } from "../comment-repository";
import { randomUUID } from "crypto";

export class InMemoryCommentRepository implements CommentRepository {
  public items: Comment[] = [];
  async create(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const comment: Comment = {
      id: randomUUID(),
      content: data.content,
      created_at: new Date(),
      updated_at: new Date(),
      owner_id: data.owner_id,
      postId: data.postId,
      votes: data.votes ?? 0,
    };

    this.items.push(comment);

    return comment;
  }
  async update(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
    const index = this.items.findIndex((comment) => comment.id === data.id);

    const comment: Comment = {
      id: randomUUID(),
      content: data.content,
      created_at: new Date(),
      updated_at: new Date(),
      owner_id: data.owner_id,
      postId: data.postId,
      votes: data.votes ?? 0,
    };

    this.items[index] = comment;

    return comment;
  }

  async delete(commentId: string): Promise<null> {
    const index = this.items.findIndex((post) => post.id === commentId);

    if (index === -1) {
      return null;
    }

    this.items.splice(index, 1);

    return null;
  }

  async findById(commentId: string): Promise<Comment | null> {
    const index = this.items.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      return null;
    }

    return this.items[index];
  }

  async fetchManyByUserId(userId: string): Promise<Comment[] | null> {
    const comment = this.items.filter((comment) => comment.owner_id === userId);

    if (comment.length === 0) {
      return null;
    }

    return comment;
  }

  async fetchCommentId(commentId: string): Promise<Comment> {
    const comment = this.items.filter((item) => item.id === commentId);

    return comment[0];
  }
}
