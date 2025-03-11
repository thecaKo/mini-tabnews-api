import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../middlewares/verify-jwt";
import { getProfile } from "./get-me-profile";
import { refresh } from "./refresh-token";
import { getAllUsers } from "./get-all-user-profile";
import { getProfileStats } from "./get-profile";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJWT] }, getProfile);

  app.get("/users", getAllUsers);

  app.get("/users/:user", getProfileStats);
}
