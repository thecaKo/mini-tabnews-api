import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";
import { deletePost } from "./delete";
import { findById } from "./find-by-id";
import { fetchManyByUserId } from "./fetch-posts-by-user-id";

export async function postsRoutes(app: FastifyInstance) {
  app.post("/post/create", { onRequest: [verifyJWT] }, create);

  app.delete("/post/delete/:id", { onRequest: verifyJWT }, deletePost);

  app.get("/post/:id", { onRequest: verifyJWT }, findById);

  app.get("/posts/:id", { onRequest: verifyJWT }, fetchManyByUserId);
}
