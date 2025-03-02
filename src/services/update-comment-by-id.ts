import { Comment } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Unauthorized } from "./errors/unauthorized-error";
import { CommentRepository } from "@/repositories/comment-repository";

interface UpdateCommentServiceRequest {
  commentId: string;
  ownerId: string;
  content: string;
  postId: string;
}

interface UpdateCommentServiceResponse {
  comment: Comment;
}

export class UpdateCommentService {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ commentId, ownerId, content, postId }: UpdateCommentServiceRequest): Promise<UpdateCommentServiceResponse> {
    const comment = await this.commentRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    if (ownerId != comment.owner_id) {
      throw new Unauthorized();
    }

    const updatedComment = await this.commentRepository.update({
      owner_id: ownerId,
      postId,
      content,
      updated_at: new Date(),
    });

    return { comment: updatedComment };
  }
}
