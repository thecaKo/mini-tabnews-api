import { expect, describe, it, beforeEach } from "vitest";
import { CommentRepository } from "@/repositories/comment-repository";
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository";
import { FetchCommentByIdService } from "./fetch-comment-by-id";

let commentRepository: CommentRepository;
let sut: FetchCommentByIdService;

describe("Fetch Comment By Id", () => {
  beforeEach(async () => {
    commentRepository = new InMemoryCommentRepository();
    sut = new FetchCommentByIdService(commentRepository);
  });

  it("should be able to fetch comment by his id", async () => {
    const { id } = await commentRepository.create({
      owner_id: "user-01",
      postId: "post-01",
      content: "content.example",
    });
    const { comment } = await sut.execute({ commentId: id });
    expect(comment.id).toEqual(expect.any(String));
  });
});
