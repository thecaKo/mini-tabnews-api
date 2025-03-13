import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";
import jwt from "jsonwebtoken";

describe("Fetch Comment (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });

  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should fetch a comment successfully", async () => {
    await request(app.server).post("/users").send({
      name: "cako123",
      email: "cako@gmail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "cako@gmail.com",
      password: "123456",
    });

    const { token } = response.body;
    const decoded = jwt.decode(token);
    const userId = decoded?.sub;

    const { body: postBody } = await request(app.server).post("/post/create").set("Cookie", `refreshToken=${token}`).send({
      title: "test-01",
      content: "test-test",
      owner_id: userId,
    });

    const { body: commentBody } = await request(app.server)
      .post(`/post/${postBody.post.id}/create-comment`)
      .set("Cookie", `refreshToken=${token}`)
      .send({
        ownerId: userId,
        postId: postBody.post.id,
        content: "created comment",
      });
    const createCommentResponse = await request(app.server)
      .get(`/post/${postBody.post.id}/fetch-comment/${commentBody.id}`)
      .set("Cookie", `refreshToken=${token}`);

    expect(response.status).toBe(200);
    expect(commentBody).toHaveProperty("id", commentBody.id);
  });
});
