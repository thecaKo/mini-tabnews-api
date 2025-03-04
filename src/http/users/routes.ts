import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../middlewares/verify-jwt";
import { getProfile } from "./get-user-profile";
import { refresh } from "./refresh-token";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh)

  app.get("/me", { onRequest: [verifyJWT] }, getProfile)
}
