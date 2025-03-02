import { fastify } from "fastify";
import { usersRoutes } from "./http/users/routes";

export const app = fastify();

app.register(usersRoutes);
