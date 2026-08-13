import { index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * A single editorial resource can represent a field guide, official-source portal,
 * toolkit entry, field note, or case update. Public queries only return published rows.
 */
export const resourceKinds = ["guide", "tool", "portal", "field_note", "case_update"] as const;
export const resourceStatuses = ["draft", "published", "archived"] as const;

export const civicResources = mysqlTable(
  "civicResources",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull().unique(),
    kind: mysqlEnum("kind", resourceKinds).notNull(),
    status: mysqlEnum("status", resourceStatuses).default("draft").notNull(),
    title: varchar("title", { length: 320 }).notNull(),
    summary: text("summary").notNull(),
    body: text("body"),
    category: varchar("category", { length: 128 }),
    jurisdiction: varchar("jurisdiction", { length: 128 }),
    sourceUrl: varchar("sourceUrl", { length: 2048 }),
    sourceLabel: varchar("sourceLabel", { length: 256 }),
    verifiedAt: timestamp("verifiedAt"),
    publishedAt: timestamp("publishedAt"),
    displayOrder: int("displayOrder").default(0).notNull(),
    isFeatured: int("isFeatured").default(0).notNull(),
    authorId: int("authorId").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    index("civic_resources_public_index").on(table.status, table.kind, table.displayOrder),
    index("civic_resources_author_index").on(table.authorId),
  ],
);

/** A resource may cite multiple underlying official documents or public records. */
export const resourceSources = mysqlTable(
  "resourceSources",
  {
    id: int("id").autoincrement().primaryKey(),
    resourceId: int("resourceId").notNull().references(() => civicResources.id, { onDelete: "cascade" }),
    label: varchar("label", { length: 320 }).notNull(),
    url: varchar("url", { length: 2048 }).notNull(),
    publisher: varchar("publisher", { length: 256 }),
    sourceType: varchar("sourceType", { length: 128 }),
    checkedAt: timestamp("checkedAt"),
    displayOrder: int("displayOrder").default(0).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  table => [index("resource_sources_resource_index").on(table.resourceId, table.displayOrder)],
);

/** Small, editable public-facing configuration such as the mission statement. */
export const siteSettings = mysqlTable("siteSettings", {
  id: int("id").autoincrement().primaryKey(),
  settingKey: varchar("settingKey", { length: 128 }).notNull().unique(),
  settingValue: text("settingValue").notNull(),
  updatedById: int("updatedById").references(() => users.id, { onDelete: "set null" }),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CivicResource = typeof civicResources.$inferSelect;
export type InsertCivicResource = typeof civicResources.$inferInsert;
export type ResourceSource = typeof resourceSources.$inferSelect;
export type InsertResourceSource = typeof resourceSources.$inferInsert;
