import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";
import { deletePost } from "./delete";
import { findById } from "./find-by-id";
import { fetchManyByUserId } from "./fetch-posts-by-user-id";
import { update } from "./update";
import { getAllPosts } from "./get-all-posts";
import { getPostBySlug } from "./get-post-by-slug";

export async function postsRoutes(app: FastifyInstance) {
  app.post("/post/create", { onRequest: [verifyJWT] }, create);

  app.delete("/post/delete/:id", { onRequest: verifyJWT }, deletePost);

  app.put("/post/update/:id", { onRequest: verifyJWT }, update);

  app.get("/post/:id", { onRequest: verifyJWT }, findById);

  app.get("/posts/:id", { onRequest: verifyJWT }, fetchManyByUserId);

  app.get("/posts", getAllPosts);

  app.get("/posts/slug/:slug", getPostBySlug);
}
