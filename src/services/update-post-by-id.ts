import { PostRepository } from "@/repositories/post-repository";
import { Post } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { generateSlug } from "./utils/generate-slug";
import { Unauthorized } from "./errors/unauthorized-error";

interface UpdatePostServiceRequest {
  userId: string;
  postId: string;
  title: string;
  content: string;
}

interface UpdatePostServiceResponse {
  post: Post;
}

export class UpdatePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ postId, title, content, userId }: UpdatePostServiceRequest): Promise<UpdatePostServiceResponse> {
    const post = await this.postRepository.findById(postId);

    if (!post) {
      throw new ResourceNotFoundError();
    }

    if (post.owner_id !== userId) {
      throw new Unauthorized();
    }

    const updatedPost = await this.postRepository.update(postId, {
      id: postId,
      title,
      slug: generateSlug(title),
      content,
      update_at: new Date(),
    });

    return updatedPost;
  }
}
