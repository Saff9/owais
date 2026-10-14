import path from "node:path";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function getDatabaseUrl(): string | undefined {
  const url = process.env.DATABASE_URL;
  if (!url) return undefined;
  if (url.startsWith("file:")) {
    const rawPath = url.replace(/^file:/, "");
    if (path.isAbsolute(rawPath)) return url;
    const normalized = rawPath.replace(/^\.\.\/db\//, "db/").replace(/^\.\/db\//, "db/");
    return `file:${path.resolve(/*turbopackIgnore: true*/ process.cwd(), normalized)}`;
  }
  return url;
}

const resolvedUrl = getDatabaseUrl();

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(resolvedUrl
      ? {
          datasources: {
            db: {
              url: resolvedUrl,
            },
          },
        }
      : {}),
    log:
      process.env.NODE_ENV === "production" ? ["error"] : ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
