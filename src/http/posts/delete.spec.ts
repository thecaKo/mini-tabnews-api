import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { teardownTestDatabase, startTestEnvironment } from "@/../prisma/vitest-environment-prisma/setup";
import jwt from "jsonwebtoken";
import { object } from "zod";
import { Unauthorized } from "@/services/errors/unauthorized-error";

describe("Create post(e2e)", () => {
  beforeAll(async () => {
    await app.ready();
    await startTestEnvironment();
  });

  afterAll(async () => {
    await app.close();
    await teardownTestDatabase();
  });

  it("should be able to delete your own posts", async () => {
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

    expect(postBody.post).toHaveProperty("id");

    const deleteResponse = await request(app.server).delete(`/post/delete/${postBody.post.id}`).set("Authorization", `Bearer ${token}`);

    expect(deleteResponse.statusCode).toEqual(204);
  });

  it("should not be able to delete other people's posts", async () => {
    // Criar o primeiro usuário
    await request(app.server).post("/users").send({
      name: "cako123",
      email: "cako@gmail.com",
      password: "123456",
    });

    const secondUserResponse = await request(app.server).post("/users").send({
      name: "cako456",
      email: "cako456@gmail.com",
      password: "123456",
    });

    const response = await request(app.server).post("/sessions").send({
      email: "cako@gmail.com",
      password: "123456",
    });

    const { token } = response.body;
    const decoded = jwt.decode(token);
    const userId = decoded?.sub;

    const { body } = await request(app.server).post("/post/create").set("Authorization", `Bearer ${token}`).send({
      title: "test-01",
      content: "test-test",
      owner_id: userId,
    });

    expect(body.post).toHaveProperty("id");

    const secondUserLoginResponse = await request(app.server).post("/sessions").send({
      email: "cako456@gmail.com",
      password: "123456",
    });

    const secondUserToken = secondUserLoginResponse.body.token;

    const deleteResponse = await request(app.server)
      .delete(`/post/delete/${body.post.id}`)
      .set("Authorization", `Bearer ${secondUserToken}`);

    expect(deleteResponse.statusCode).toEqual(401);
  });
});
