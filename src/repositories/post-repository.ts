import { Prisma, Post } from "@prisma/client";

export interface PostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  remove(postId: string): Promise<Post | null>;
  update(data: Prisma.PostUncheckedUpdateInput): Promise<Post | null>;
  delete(postId: string): Promise<null>;
}
