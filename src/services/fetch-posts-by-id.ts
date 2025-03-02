import { PostRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchPostByIdResquest {
  postId: string;
}

interface FetchPostByIdResponse {
  post: Post;
}

export class FetchPostById {
  constructor(private postsRepository: PostRepository) {}
  async execute({ postId }: FetchPostByIdResquest): Promise<FetchPostByIdResponse> {
    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    return { post };
  }
}
