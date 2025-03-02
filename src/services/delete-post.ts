import { PostRepository } from "@/repositories/post-repository";

interface DeletePostServiceRequest {
  postId: string;
}

export class DeletePostService {
  constructor(private postRepository: PostRepository) {}

  async execute({ postId }: DeletePostServiceRequest) {
    this.postRepository.delete(postId);

    return null;
  }
}
