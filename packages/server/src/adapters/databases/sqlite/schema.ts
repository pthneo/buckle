import { z } from "zod";

/**
 * Used to parse the connection options for a SQLite database
 *
 * Matches the {@link SQLiteConnectionOptions} type
 */
const sqliteConnectionOptionsSchema = z.object({
  adapter: z.literal("sqlite").optional(),
  filename: z.string().optional(),
  readonly: z.boolean().optional(),
  create: z.boolean().optional(),
  readwrite: z.boolean().optional(),
  strict: z.boolean().optional(),
  safeIntegers: z.boolean().optional(),
});

/**
 * Either a path/URL string or a set of connection options must be provided
 *
 * Matches the {@link SQLiteConnection} type
 */
const sqliteConnectionSchema = z.union([z.string(), sqliteConnectionOptionsSchema], {
  error: "Connection must be either a path/URL string or a set of connection options",
});

/**
 * Used to parse the SQLite config
 *
 * Matches the {@link SQLiteConfig} type
 */
export const sqliteConfigSchema = z.object({
  connection: sqliteConnectionSchema,
  name: z.string({ error: "Service name is required" }),
  type: z.literal("sqlite"),
});
