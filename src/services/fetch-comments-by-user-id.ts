import { Comment } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Unauthorized } from "./errors/unauthorized-error";
import { CommentRepository } from "@/repositories/comment-repository";

interface FetchCommentsByOwnerIdServiceRequest {
  ownerId: string;
}

interface FetchCommentsByOwnerServiceResponse {
  comment: Comment[];
}

export class FetchCommentsByUserIdService {
  constructor(private commentRepository: CommentRepository) {}

  async execute({ ownerId }: FetchCommentsByOwnerIdServiceRequest): Promise<FetchCommentsByOwnerServiceResponse> {
    const comment = await this.commentRepository.fetchManyByUserId(ownerId);

    if (!comment || comment?.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { comment };
  }
}
