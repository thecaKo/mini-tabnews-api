import { PostRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FetchPostsByUserIdResquest {
  userId: string;
}

interface FetchPostsByUserIdResponse {
  posts: Post[];
}

export class FetchPostsByUserId {
  constructor(private postsRepository: PostRepository) {}
  async execute({ userId }: FetchPostsByUserIdResquest): Promise<FetchPostsByUserIdResponse> {
    const posts = await this.postsRepository.fetchManyByUserId(userId);

    if (!posts || posts?.length === 0) {
      throw new ResourceNotFoundError();
    }

    return { posts };
  }
}
