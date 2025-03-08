import { fastify } from "fastify";
import { usersRoutes } from "./http/users/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { postsRoutes } from "./http/posts/routes";
import { commentsRoutes } from "./http/comments/routes";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCors, {
  origin: "http://localhost:3000",
  credentials: true,
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(postsRoutes);
app.register(commentsRoutes);
