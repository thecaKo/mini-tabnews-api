import { randomUUID } from "crypto";
import { execSync } from "node:child_process";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const schema = randomUUID();
const databaseURL = generateDatabaseURL(schema);
process.env.DATABASE_URL = databaseURL;

const prisma = new PrismaClient();

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export async function startTestEnvironment() {
  console.log("🔧 Setting up test environment...");

  await setupTestDatabase();

  return async () => {
    console.log("🧹 Cleaning up test environment...");
    await teardownTestDatabase();
  };
}

async function setupTestDatabase() {
  console.log("📦 Initializing test database...");

  execSync("npx prisma migrate deploy");
}

export async function teardownTestDatabase() {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
  await prisma.$disconnect();
}
