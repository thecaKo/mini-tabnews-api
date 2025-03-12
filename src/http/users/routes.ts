import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../middlewares/verify-jwt";
import { refresh } from "./refresh-token";
import { getAllUsers } from "./get-all-user-profile";
import { getProfileByUserId } from "./get-me-profile-by-user-id";
import { getProfileStats } from "./get-profile-by-username";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);

  app.patch("/token/refresh", refresh);

  app.get("/me", { onRequest: [verifyJWT] }, getProfileByUserId);

  app.get("/users", getAllUsers);

  app.get("/users/:user", getProfileStats);
}
