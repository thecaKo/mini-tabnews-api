import { CommentRepository } from "@/repositories/comment-repository";

interface DeleteCommentServiceRequest {
  commentId: string;
}

export class DeleteComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ commentId }: DeleteCommentServiceRequest) {
    await this.commentRepository.delete(commentId);
  }
}
