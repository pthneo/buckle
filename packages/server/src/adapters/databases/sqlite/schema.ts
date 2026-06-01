import { z } from "zod";

/**
 * Used to parse the connection options for a SQLite database
 *
 * Matches Bun's SQL.SQLiteOptions shape
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
 */
const sqliteConnectionSchema = z.union([z.string(), sqliteConnectionOptionsSchema]);

/**
 * Used to parse the SQLite config
 *
 * Matches the {@link SQLiteConfig} type
 */
export const sqliteConfigSchema = z.object({
  connection: sqliteConnectionSchema,
  name: z.string(),
  type: z.literal("sqlite"),
});
