import { UserAlredyExistError } from "@/services/errors/user-alredy-exists-error";
import { makeRegisterService } from "@/services/factories/users/make-register-service";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterService();
    await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlredyExistError) {
      return reply.status(409).send();
    }
    throw err;
  }

  return reply.status(201).send();
}
