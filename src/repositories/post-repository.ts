import { Prisma, Post } from "@prisma/client";

export interface PostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  update(data: Prisma.PostUncheckedUpdateInput): Promise<Post>;
  delete(postId: string): Promise<null>;
  findById(postId: string): Promise<Post | null>;
  fetchManyByUserId(userId: string): Promise<Post[] | null>;
}
