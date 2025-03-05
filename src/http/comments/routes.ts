import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";

export async function commentsRoutes(app: FastifyInstance) {
  app.post("/post/:id/create-comment", { onRequest: verifyJWT }, create);
}
