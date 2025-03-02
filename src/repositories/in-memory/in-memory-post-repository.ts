import { Prisma, Post } from "@prisma/client";
import { PostRepository } from "../post-repository";
import { randomUUID } from "crypto";
import { generateSlug } from "@/services/utils/generate-slug";

export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = [];

  async create(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const post: Post = {
      id: randomUUID(),
      slug: generateSlug(data.title),
      title: data.title,
      content: data.content,
      up_votes: data.up_votes ?? 0,
      created_at: new Date(),
      update_at: new Date(),
      owner_id: data.owner_id,
    };

    this.items.push(post);

    return post;
  }
  async remove(postId: string): Promise<Post | null> {
    const index = this.items.findIndex((post) => post.id === postId);

    if (index === -1) {
      return null;
    }

    const [removedPost] = this.items.splice(index, 1);

    return removedPost;
  }
  async update(data: Prisma.PostUncheckedCreateInput): Promise<Post> {
    const index = this.items.findIndex((post) => post.id === data.id);

    const updatePost: Post = {
      id: randomUUID(),
      slug: generateSlug(data.title),
      title: data.title,
      content: data.content,
      up_votes: data.up_votes ?? 0,
      created_at: new Date(),
      update_at: new Date(),
      owner_id: data.owner_id,
    };

    this.items[index] = updatePost;

    return updatePost;
  }

  async delete(postId: string): Promise<null> {
    const index = this.items.findIndex((post) => post.id === postId);

    if (index === -1) {
      return null;
    }

    this.items.splice(index, 1);

    return null;
  }

  async findById(postId: string): Promise<Post | null> {
    const index = this.items.findIndex((post) => post.id === postId);

    if (index === -1) {
      return null;
    }

    return this.items[index];
  }

  async fetchManyByUserId(userId: string): Promise<Post[] | null> {
    const posts = this.items.filter((item) => item.owner_id === userId);

    if (posts.length === 0) {
      return null;
    }

    return posts;
  }

  async fetchPostId(postId: string): Promise<Post | null> {
    const posts = this.items.filter((item) => item.id === postId);

    if (posts.length === 0) {
      return null;
    }

    return posts[0];
  }
}
