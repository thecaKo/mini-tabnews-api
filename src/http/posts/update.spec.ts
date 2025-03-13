import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";
import jwt from "jsonwebtoken";

describe("Update post (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });

  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to update a post if the user is the owner", async () => {
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

    const postResponse = await request(app.server).post("/post/create").set("Cookie", `refreshToken=${token}`).send({
      title: "test-01",
      content: "test-test",
      owner_id: userId,
    });

    expect(postResponse.status).toBe(201);

    const postId = postResponse.body.post.id;

    const updatedPostResponse = await request(app.server).put(`/post/update/${postId}`).set("Cookie", `refreshToken=${token}`).send({
      title: "updated-post",
      content: "this-really-updated",
    });

    expect(updatedPostResponse.status).toBe(200);
    expect(updatedPostResponse.body.updated_post.title).toBe("updated-post");
  });
});
