import { sqliteTable, AnySQLiteColumn, text, integer } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const controledItems = sqliteTable("controled-items", {
	name: text().notNull(),
	label: text().primaryKey().notNull(),
	type: text().default("switch").notNull(),
	pushTime: integer().default(1000).notNull(),
	forceOn: integer().default(1).notNull(),
	forceOff: integer().default(0).notNull(),
	icon: text().default("ion:switch").notNull(),
	order: integer(),
});

export const connectedPeers = sqliteTable("connected-peers", {
	peer: text().primaryKey().notNull(),
	user: text().default("").notNull(),
	createdAt: text().notNull(),
	expiredAt: text().notNull(),
});

export const cfKv = sqliteTable("_cf_KV", {
});

export const drizzleMigrations = sqliteTable("__drizzle_migrations", {
});

