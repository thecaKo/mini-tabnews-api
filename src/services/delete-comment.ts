import { CommentRepository } from "@/repositories/comment-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface DeleteCommentServiceRequest {
  commentId: string;
}

export class DeleteComment {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ commentId }: DeleteCommentServiceRequest) {
    const findComment = await this.commentRepository.findById(commentId);
    if (!findComment) {
      throw new ResourceNotFoundError();
    }

    await this.commentRepository.delete(commentId);
  }
}
