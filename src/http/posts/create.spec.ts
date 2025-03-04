import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";
import jwt from "jsonwebtoken";
import { object } from "zod";

describe("Create post(e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });

  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to create a post", async () => {
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

    const postResponse = await request(app.server).post("/post/create").set("Authorization", `Bearer ${token}`).send({
      title: "test-01",
      content: "test-test",
      owner_id: userId,
    });

    expect(postResponse.statusCode).toBe(201);
    expect(postResponse.body.post).toEqual(
      expect.objectContaining({
        owner_id: userId,
      }),
    );
  });
});
