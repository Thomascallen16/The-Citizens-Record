import { asc, desc, eq } from "drizzle-orm";
import { drizzle, type MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../drizzle/schema";
import { civicResources, InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';
import type { CivicResourceInput } from "./contentValidation";

let _db: MySql2Database<typeof schema> | null = null;
let _pool: mysql.Pool | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (_db) return _db;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.warn("[Database] DATABASE_URL is not configured");
    return null;
  }

  try {
    _pool ??= mysql.createPool({
      uri: databaseUrl,
      waitForConnections: true,
      connectionLimit: 5,
      maxIdle: 2,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
    _db = drizzle(_pool, { schema, mode: "default" });
    return _db;
  } catch (error) {
    console.error("[Database] Could not initialize the MySQL connection pool:", error);
    _pool = null;
    _db = null;
  }

  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function listPublishedCivicResources() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  return db
    .select()
    .from(civicResources)
    .where(eq(civicResources.status, "published"))
    .orderBy(asc(civicResources.displayOrder), desc(civicResources.publishedAt));
}

export async function listAllCivicResources() {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  return db.select().from(civicResources).orderBy(desc(civicResources.updatedAt));
}

export async function createCivicResource(input: CivicResourceInput, authorId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  const values = {
    ...input,
    isFeatured: input.isFeatured ? 1 : 0,
    publishedAt: input.status === "published" ? new Date() : null,
    authorId,
  };
  await db.insert(civicResources).values(values);
  return { slug: values.slug };
}

export async function setCivicResourceStatus(id: number, status: "draft" | "published" | "archived") {
  const db = await getDb();
  if (!db) throw new Error("Database is unavailable");

  await db
    .update(civicResources)
    .set({ status, publishedAt: status === "published" ? new Date() : null })
    .where(eq(civicResources.id, id));
  return { id, status };
}
