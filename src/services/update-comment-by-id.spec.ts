import { expect, describe, it, beforeEach } from "vitest";
import { CommentRepository } from "@/repositories/comment-repository";
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository";
import { UpdateCommentService } from "./update-comment-by-id";
import { Unauthorized } from "./errors/unauthorized-error";

let commentRepository: CommentRepository;
let sut: UpdateCommentService;

describe("Update Comment By Id Service", () => {
  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    sut = new UpdateCommentService(commentRepository);
  });

  it("should be able to update your own comment by id", async () => {
    const { id } = await commentRepository.create({
      owner_id: "user-01",
      postId: "post-01",
      content: "content.example",
    });

    const { comment } = await sut.execute({
      commentId: id,
      ownerId: "user-01",
      postId: "post-01",
      content: "updated content",
    });

    expect(comment.content).toEqual("updated content");
  });

  it("should not be able to update other people comment by id", async () => {
    const { id } = await commentRepository.create({
      owner_id: "user-01",
      postId: "post-01",
      content: "content.example",
    });

    await expect(() =>
      sut.execute({ commentId: id, ownerId: "user-02", postId: "post-01", content: "updated content" }),
    ).rejects.toBeInstanceOf(Unauthorized);
  });
});
