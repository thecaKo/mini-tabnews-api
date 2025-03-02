import { PostRepository } from "@/repositories/post-repository";
import { expect, describe, it, beforeEach } from "vitest";
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository";
import { FetchPostById } from "./fetch-posts-by-id";

let postsRepository: PostRepository;
let sut: FetchPostById;

describe("Fetch Post By Id Use Case", () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostRepository();
    sut = new FetchPostById(postsRepository);
  });

  it("should be able to fetch a post by his id", async () => {
    const createdPost = await postsRepository.create({
      owner_id: "user-01",
      title: "title.example",
      slug: "title.example",
      content: "content.example",
    });

    const { post } = await sut.execute({ postId: createdPost.id });

    expect(post.id).toEqual(expect.any(String));
  });
});
