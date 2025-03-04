import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";

describe("Register (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });
  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to register", async () => {
    const response = await request(app.server).post("/users").send({
      name: "cako123",
      email: "cako@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
