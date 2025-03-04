import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";

export async function postsRoutes(app: FastifyInstance) {
  app.post("/post/create", { onRequest: [verifyJWT] }, create);
}
