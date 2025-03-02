import { expect, describe, it, beforeEach } from "vitest";
import { CommentRepository } from "@/repositories/comment-repository";
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository";
import { FetchCommentsByUserIdService } from "./fetch-comments-by-user-id";

let commentRepository: CommentRepository;
let sut: FetchCommentsByUserIdService;

describe("Fetch Comment By User Id", () => {
  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    sut = new FetchCommentsByUserIdService(commentRepository);
  });

  it("should be able to fetch comment by his owner id", async () => {
    await commentRepository.create({
      owner_id: "user-01",
      postId: "post-01",
      content: "content.example",
    });

    await commentRepository.create({
      owner_id: "user-01",
      postId: "post-01",
      content: "content.example",
    });

    const { comment } = await sut.execute({ ownerId: "user-01" });
    expect(comment).toHaveLength(2);
    comment.forEach((comment) => {
      expect(comment).toEqual(expect.objectContaining({ content: "content.example" }));
    });
  });
});
