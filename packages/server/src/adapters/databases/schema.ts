import { z } from "zod";
import { mysqlConfigSchema } from "./mysql/schema";
import { postgresConfigSchema } from "./postgres/schema";
import { sqliteConfigSchema } from "./sqlite/schema";

/**
 * Used to parse the database config
 */
export const databaseConfigSchema = z.discriminatedUnion("type", [
  postgresConfigSchema,
  mysqlConfigSchema,
  sqliteConfigSchema
]);
