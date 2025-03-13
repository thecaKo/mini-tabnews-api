import { FastifyReply, FastifyRequest } from "fastify";

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("refreshToken", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return reply.status(200).send({ message: "Logout realizado com sucesso" });
}
