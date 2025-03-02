import { PostRepository } from "@/repositories/post-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { FetchPostsByUserId } from "./fetch-posts-by-user-id";
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository";

let postsRepository: PostRepository;
let sut: FetchPostsByUserId;

describe("Fetch Posts By User Id Use Case", () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostRepository();
    sut = new FetchPostsByUserId(postsRepository);
  });

  it("should be able to fetch posts of same user", async () => {
    await postsRepository.create({
      owner_id: "user-01",
      title: "title.example",
      slug: "title.example",
      content: "content.example",
    });
    await postsRepository.create({
      owner_id: "user-01",
      title: "title.example",
      slug: "title.example",
      content: "content.example",
    });

    const { posts } = await sut.execute({ userId: "user-01" });
    expect(posts).toHaveLength(2);
    posts.forEach((post) => {
      expect(post).toEqual(expect.objectContaining({ title: "title.example" }));
    });
  });
});
