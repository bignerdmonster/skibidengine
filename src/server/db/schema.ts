// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
  text
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `skibidengine_${name}`);

export const posts = createTable(
  "post",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    user: varchar("user").notNull(),
    title: varchar("title", {length:256}).notNull(),
    content: varchar("content").notNull(),
    karma: integer("karma").default(0).notNull(),
    comments: text("comments")
      .array()
      .default(sql`'{}'::text[]`),
  }
);
export const upvoteTable = createTable(
  "userUpvotes",
  {
    userID: varchar("userID").primaryKey().notNull(),
    ratings: text("ratings")
      .array()
      .default(sql`'{}'::text[]`),
  }
)