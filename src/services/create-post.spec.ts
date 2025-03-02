import { it, expect, describe, beforeEach } from "vitest";
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository";
import { CreatePostService } from "./create-post";

let postRepository: InMemoryPostRepository;
let sut: CreatePostService;

describe("Create Post Service Test", async () => {
  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    sut = new CreatePostService(postRepository);
  });

  it("should be able to create a post", async () => {
    const { post } = await sut.execute({
      owner_id: "user-01",
      title: "title.example",
      content: "content.example",
    });

    expect(post).toEqual(expect.objectContaining({ title: "title.example" }));
  });
});
