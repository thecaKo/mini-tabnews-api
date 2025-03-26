import { fastify } from "fastify";
import { usersRoutes } from "./http/users/routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import { postsRoutes } from "./http/posts/routes";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import { commentsRoutes } from "./http/comments/routes";
import fastifyCors from "@fastify/cors";

export const app = fastify();

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Mini Tab News",
      description: "Creating a complete blog-style project with newer technologies",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/documentation",
});

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
