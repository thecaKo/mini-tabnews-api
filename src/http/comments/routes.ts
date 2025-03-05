import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";
import { deleteComment } from "./delete";

export async function commentsRoutes(app: FastifyInstance) {
  app.post("/post/:id/create-comment", { onRequest: verifyJWT }, create);

  app.delete(`/post/:id/delete-comment/:id`, { onRequest: verifyJWT }, deleteComment);
}
