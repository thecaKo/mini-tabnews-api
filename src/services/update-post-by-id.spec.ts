import { PostRepository } from "@/repositories/post-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository";
import { FetchPostById } from "./fetch-posts-by-id";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let postsRepository: PostRepository;
let sut: FetchPostById;

describe("Fetch Posts By Id Use Case", () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostRepository();
    sut = new FetchPostById(postsRepository);
  });

  it("should be able to fetch a post by his id", async () => {
    await postsRepository.create({
      owner_id: "user-01",
      title: "title.example",
      slug: "title.example",
      content: "content.example",
    });
    const postToTest = await postsRepository.create({
      owner_id: "user-02",
      title: "title.example",
      slug: "title.example",
      content: "content.example",
    });

    const { post } = await sut.execute({ postId: postToTest.id });

    expect(post.update_at).toEqual(expect.any(Date));
  });

  it("should not be able to fetch posts that it not exists", async () => {
    await postsRepository.create({
      owner_id: "user-01",
      title: "title.example",
      slug: "title.example",
      content: "content.example",
    });

    await expect(() => sut.execute({ postId: "non-existing-post-id" })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
