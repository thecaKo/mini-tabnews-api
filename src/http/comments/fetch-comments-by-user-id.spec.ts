import { beforeEach, afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";
import jwt from "jsonwebtoken";

describe("Fetch Comment by User ID (E2E)", () => {
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
    await request(app.server).post(`/post/${postBody.post.id}/create-comment`).set("Authorization", `Bearer ${token}`).send({
      ownerId: userId,
      postId: postBody.post.id,
      content: "created comment 02",
    });

    const commentsResponse = await request(app.server).get(`/comments/${userId}`).set("Authorization", `Bearer ${token}`);

    expect(commentsResponse.body.comments).toHaveLength(2);
  });
});
