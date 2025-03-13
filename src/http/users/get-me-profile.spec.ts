import { app } from "@/app";
import { startTestEnvironment, teardownTestDatabase } from "prisma/vitest-environment-prisma/setup";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Get Me (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });
  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      name: "cako",
      email: "cakinho@gmail.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "cakinho@gmail.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server).get("/me").set("Cookie", `refreshToken=${token}`).send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
      }),
    );
  });
});
