import { PostRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPostBySlugRequest {
  slug: string;
}

interface GetPostSlugByResponse {
  post: Post;
}

export class GetPostBySlugService {
  constructor(private postsRepository: PostRepository) {}
  async execute({ slug }: GetPostBySlugRequest): Promise<GetPostSlugByResponse> {
    const post = await this.postsRepository.findBySlug(slug);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    return { post };
  }
}
