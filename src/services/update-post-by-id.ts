import { PostRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { generateSlug } from "./utils/generate-slug";

interface UpdatePostServiceRequest {
  postId: string;
  title: string;
  content: string;
}

interface UpdatePostServiceResponse {
  post: Post;
}

export class UpdatePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ postId, title, content }: UpdatePostServiceRequest): Promise<UpdatePostServiceResponse> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    const updatedPost = await this.postRepository.update({
      id: postId,
      title,
      slug: generateSlug(title),
      content,
      update_at: new Date(),
    });

    return { post: updatedPost };
  }
}
