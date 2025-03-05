import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";
import jwt from "jsonwebtoken";

describe("Create comment(e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });

  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to create a comment", async () => {
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

    const { body: postBody } = await request(app.server).post("/post/create").set("Authorization", `Bearer ${token}`).send({
      title: "test-01",
      content: "test-test",
      owner_id: userId,
    });

    await request(app.server).post(`/post/${postBody.post.id}/create-comment`).set("Authorization", `Bearer ${token}`).send({
      ownerId: userId,
      postId: postBody.post.id,
      content: "created comment",
    });

    const fetchedPostWithNewComment = await request(app.server).get(`/post/${postBody.post.id}`).set("Authorization", `Bearer ${token}`);

    expect(fetchedPostWithNewComment.body.post.Comment).toEqual([
      expect.objectContaining({
        content: "created comment",
      }),
    ]);
  });
});
