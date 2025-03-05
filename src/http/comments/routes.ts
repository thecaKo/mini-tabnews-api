import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";
import { deleteComment } from "./delete";
import { update } from "./update";

export async function commentsRoutes(app: FastifyInstance) {
  app.post("/post/:id/create-comment", { onRequest: verifyJWT }, create);

  app.delete(`/post/:id/delete-comment/:id`, { onRequest: verifyJWT }, deleteComment);

  app.put(`/post/:id/update-comment/:id`, { onRequest: verifyJWT }, update);
}
