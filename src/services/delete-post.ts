import { PostRepository } from "@/repositories/post-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { Unauthorized } from "./errors/unauthorized-error";

interface DeletePostServiceRequest {
  postId: string;
  userId: string;
}

export class DeletePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ postId, userId }: DeletePostServiceRequest) {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    if (post.owner_id !== userId) {
      throw new Unauthorized();
    }

    await this.postRepository.delete(postId);

    return post;
  }
}
