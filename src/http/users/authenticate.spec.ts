import { app } from "@/app";
import { startTestEnvironment, teardownTestDatabase } from "prisma/vitest-environment-prisma/setup";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });
  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "cako",
      email: "cakinho@gmail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "cakinho@gmail.com",
      password: "123456",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
    });
  });
});
