import { it, expect, describe, beforeEach } from "vitest";
import { InMemoryPostRepository } from "@/repositories/in-memory/in-memory-post-repository";
import { DeletePostService } from "./delete-post";

let postRepository: InMemoryPostRepository;
let sut: DeletePostService;

describe("Delete Post Service Test", async () => {
  beforeEach(() => {
    postRepository = new InMemoryPostRepository();
    sut = new DeletePostService(postRepository);
  });

  it("should be able to delete a existing post", async () => {
    const { id } = await postRepository.create({
      owner_id: "user-01",
      title: "title.example",
      slug: "title.example",
      content: "content.example",
    });

    await sut.execute({ postId: id });

    await expect(postRepository.findById(id)).resolves.toBeNull();
  });
});
