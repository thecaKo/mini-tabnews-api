import { randomUUID } from "crypto";
import { execSync } from "node:child_process";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { UUID } from "node:crypto";

const prisma = new PrismaClient();
let schema: UUID;

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default async function () {
  console.log("🔧 Setting up test environment...");

  await setupTestDatabase();

  return async () => {
    console.log("🧹 Cleaning up test environment...");
    await teardownTestDatabase();
  };
}

async function setupTestDatabase() {
  console.log("📦 Initializing test database...");

  schema = randomUUID();
  const databaseURL = generateDatabaseURL(schema);

  process.env.DATABASE_URL = databaseURL;

  execSync("npx prisma migrate deploy");
}

async function teardownTestDatabase() {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await prisma.$disconnect();
}
