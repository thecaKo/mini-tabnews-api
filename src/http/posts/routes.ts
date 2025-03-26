import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";
import { deletePost } from "./delete";
import { findById } from "./fetch-by-id";
import { fetchManyByUserId } from "./fetch-posts-by-user-id";
import { update } from "./update";
import { getAllPosts } from "./get-all-posts";
import { getPostBySlug } from "./get-post-by-slug";
import {
  createPostSchema,
  deletePostSchema,
  getAllPostsSchema,
  getPostByIdSchema,
  getPostByOwnerIdSchema,
  getPostBySlugSchema,
  updatePostSchema,
} from "./posts-schema";

export async function postsRoutes(app: FastifyInstance) {
  app.post("/post/create", { onRequest: [verifyJWT], schema: createPostSchema }, create);

  app.delete("/post/delete/:id", { onRequest: verifyJWT, schema: deletePostSchema }, deletePost);

  app.put("/post/update/:id", { onRequest: verifyJWT, schema: updatePostSchema }, update);

  app.get("/post/:id", { schema: getPostByIdSchema }, findById);

  app.get("/post/owner/:id", { schema: getPostByOwnerIdSchema }, fetchManyByUserId);

  app.get("/posts", { schema: getAllPostsSchema }, getAllPosts);

  app.get("/posts/slug/:slug", { schema: getPostBySlugSchema }, getPostBySlug);
}
