import { CommentRepository } from "@/repositories/comment-repository";
import { Comment } from "@prisma/client";
import { randomUUID } from "crypto";

interface CreateCommentServiceRequest {
  ownerId: string;
  postId: string;
  content: string;
}

interface CreateCommentServiceResponse {
  comment: Comment;
}

export class CreateComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ ownerId, postId, content }: CreateCommentServiceRequest): Promise<CreateCommentServiceResponse> {
    const comment = await this.commentRepository.create({
      id: randomUUID(),
      content,
      created_at: new Date(),
      updated_at: new Date(),
      postId,
      owner_id: ownerId,
      votes: 0,
    });

    return { comment };
  }
}
