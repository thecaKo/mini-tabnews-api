import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";
import jwt from "jsonwebtoken";

describe("Fetch Post By User Id(e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });

  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to fetch all posts of an user id", async () => {
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

    await request(app.server).post("/post/create").set("Authorization", `Bearer ${token}`).send({
      title: "test-01",
      content: "test-test",
      owner_id: userId,
    });
    await request(app.server).post("/post/create").set("Authorization", `Bearer ${token}`).send({
      title: "test-02",
      content: "test-test-test",
      owner_id: userId,
    });

    const { body: postsBody } = await request(app.server).get(`/posts/${userId}`).set("Authorization", `Bearer ${token}`);

    expect(postsBody).toHaveLength(2);
  });
});
