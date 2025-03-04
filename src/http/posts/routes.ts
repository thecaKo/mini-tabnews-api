import { FastifyInstance } from "fastify";
import { verifyJWT } from "../middlewares/verify-jwt";
import { create } from "./create";
import { deletePost } from "./delete";

export async function postsRoutes(app: FastifyInstance) {
  app.post("/post/create", { onRequest: [verifyJWT] }, create);

  app.delete("/post/delete/:id", { onRequest: verifyJWT }, deletePost);
}
