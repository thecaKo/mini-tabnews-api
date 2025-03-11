import { prisma } from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export class PrismaUserRepository implements UsersRepository {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany({ include: { Comment: true, Post: true } });

    return users;
  }
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
  async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({ where: { name: username } });

    return user;
  }
}
