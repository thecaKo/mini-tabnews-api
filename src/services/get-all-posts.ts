import { PostRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";

interface GetAllPostsServiceResponse {
  posts: Post[];
}

export class GetAllPosts {
  constructor(private postRepository: PostRepository) {}
  async execute(): Promise<GetAllPostsServiceResponse> {
    const posts = await this.postRepository.getAllPosts();

    return { posts };
  }
}
