import { PrismaClient } from "@prisma/client";

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

declare global {
  // eslint-disable-next-line no-var, no-shadow
  var prisma: PrismaClient;
}
