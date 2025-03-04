import { PrismaUserRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateService } from "@/services/authenticate";
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUserRepository();
    const authenticateService = new AuthenticateService(prismaUsersRepository);
    const { user } = await authenticateService.execute({ email, password });

    const token = await reply.jwtSign({
      sub: user.id,
      username: user.name,
      role: user.role,
    });

    const refreshToken = await reply.jwtSign(
      { role: user.role },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      },
    );

    return reply
      .setCookie("refreshToken", refreshToken, {
        path: "/",
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token: token });
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send();
    }
    throw err;
  }
}
