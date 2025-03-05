import { Prisma, Post } from "@prisma/client";
import { PostRepository } from "../post-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPostRepository implements PostRepository {
  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const user = await prisma.post.create({
      data,
    });

    return user;
  }
  async update(postId: string, data: Prisma.PostUncheckedUpdateInput): Promise<Post | null> {
    const existingPost = await prisma.post.findUnique({ where: { id: postId } });

    if (!existingPost) {
      return null;
    }

    const updatedPost = await prisma.post.update({
      where: { id: existingPost?.id },
      data,
    });

    return updatedPost;
  }
  async delete(postId: string): Promise<null> {
    await prisma.post.delete({ where: { id: postId } });
    return null;
  }

  async findById(postId: string): Promise<Post | null> {
    const post = await prisma.post.findUnique({ where: { id: postId }, include: { Comment: true, user: true } });

    if (!post) {
      return null;
    }

    return post;
  }

  async fetchManyByUserId(userId: string): Promise<Post[] | null> {
    const posts = await prisma.post.findMany({ where: { owner_id: userId } });

    if (!posts) {
      return null;
    }

    return posts;
  }
}
