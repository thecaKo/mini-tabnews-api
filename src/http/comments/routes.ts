import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";
import { deleteComment } from "./delete";
import { update } from "./update";
import { fetchCommentsByUserId } from "./fetch-comments-by-user-id";
import { fetchCommentById } from "./fetch-comment-by-id";
import {
  createCommentSchema,
  deleteCommentSchema,
  getCommentByIdSchema,
  getCommentByOwnerIdSchema,
  updateCommentByIdSchema,
} from "./comments-schema";

export async function commentsRoutes(app: FastifyInstance) {
  app.get("/comment/owner/:id", { onRequest: verifyJWT, schema: getCommentByOwnerIdSchema }, fetchCommentsByUserId);

  app.get("/comment/:id", { onRequest: verifyJWT, schema: getCommentByIdSchema }, fetchCommentById);

  app.post("/post/:id/create-comment", { onRequest: verifyJWT, schema: createCommentSchema }, create);

  app.delete(`/post/:id/delete-comment/:id`, { onRequest: verifyJWT, schema: deleteCommentSchema }, deleteComment);

  app.put(`/post/:id/update-comment/:id`, { onRequest: verifyJWT, schema: updateCommentByIdSchema }, update);
  updateCommentByIdSchema;
}
