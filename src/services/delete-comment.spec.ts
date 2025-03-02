import { it, expect, describe, beforeEach } from "vitest";
import { InMemoryCommentRepository } from "@/repositories/in-memory/in-memory-comment-repository";
import { DeleteComment } from "./delete-comment";

let commentRepository: InMemoryCommentRepository;
let sut: DeleteComment;

describe("Delete Comment Service Test", async () => {
  beforeEach(() => {
    commentRepository = new InMemoryCommentRepository();
    sut = new DeleteComment(commentRepository);
  });

  it("should be able to delete a comment", async () => {
    const { id } = await commentRepository.create({
      owner_id: "user-01",
      postId: "post-01",
      content: "comentario legal",
    });

    await sut.execute({ commentId: id });

    await expect(commentRepository.findById(id)).resolves.toBeNull();
  });
});
