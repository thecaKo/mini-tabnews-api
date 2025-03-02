import { it, expect, describe, beforeEach } from "vitest";
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository";
import { CreateComment } from "./create-comment";

let commentRepository: InMemoryCommentRepository;
let sut: CreateComment;

describe("Create Comment Service Test", async () => {
  beforeEach(() => {
    commentRepository = new InMemoryCommentRepository();
    sut = new CreateComment(commentRepository);
  });

  it("should be able to create a comment", async () => {
    const { comment } = await sut.execute({
      ownerId: "user-01",
      postId: "post-01",
      content: "content.example",
    });

    expect(comment.id).toEqual(expect.any(String));
  });
});
