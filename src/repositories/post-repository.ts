import { Prisma, Post } from "@prisma/client";

export interface PostRepository {
  create(data: Prisma.PostUncheckedCreateInput): Promise<Post>;
  update(postId: string, data: Prisma.PostUncheckedUpdateInput): Promise<Post | null>;
  delete(postId: string): Promise<null>;
  findById(postId: string): Promise<Post | null>;
  findBySlug(slug: string): Promise<Post | null>;
  fetchManyByUserId(userId: string): Promise<Post[] | null>;
  getAllPosts(): Promise<Post[] | null>;
}
