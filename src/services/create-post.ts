import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository";
import { PostRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";

interface CreatePostServiceRequest {
  owner_id: string;
  title: string;
  content: string;
}

interface CreatePostServiceResponse {
  post: Post;
}

export class CreatePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ owner_id, title, content }: CreatePostServiceRequest): Promise<CreatePostServiceResponse> {
    const post = await this.postRepository.create({
      owner_id,
      title,
      slug: title,
      content,
    });

    return { post };
  }
}
