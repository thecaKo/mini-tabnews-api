import { Comment } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CommentRepository } from "@/repositories/comment-repository";

interface FetchCommentByIdServiceRequest {
  commentId: string;
}

interface FetchCommentByIdServiceResponse {
  comment: Comment;
}

export class FetchCommentByIdService {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ commentId }: FetchCommentByIdServiceRequest): Promise<FetchCommentByIdServiceResponse> {
    const comment = await this.commentRepository.findById(commentId);

    if (!comment) {
      throw new ResourceNotFoundError();
    }

    return { comment };
  }
}
