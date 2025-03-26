import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../middlewares/verify-jwt";
import { refresh } from "./refresh-token";
import { getAllUsers } from "./get-all-user-profile";
import { getProfileByUserId } from "./get-me-profile-by-user-id";
import { getProfileStats } from "./get-profile-by-username";
import { logout } from "./logout";
import {
  getUserSchema,
  createUserSchema,
  loginUserSchema,
  getAllUsersDocs,
  refreshTokenUserSchema,
  getProfileUserSchema,
  logoutUserSchema,
} from "./user-schema";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", { schema: createUserSchema }, register);
  app.post("/sessions", { schema: loginUserSchema }, authenticate);

  app.patch("/token/refresh", { schema: refreshTokenUserSchema }, refresh);

  app.get("/me", { onRequest: [verifyJWT], schema: getProfileUserSchema }, getProfileByUserId);

  app.get("/users", { schema: getAllUsersDocs }, getAllUsers);

  app.get("/users/:user", { schema: getUserSchema }, getProfileStats);

  app.post("/logout", { schema: logoutUserSchema }, logout);
}
