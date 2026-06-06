import { z } from "zod";

/**
 * Used to parse the connection options for a MySQL database
 *
 * Matches the {@link MySQLConnectionOptions} type
 */
const mysqlConnectionOptionsSchema = z.object({
  database: z.string({ error: "Database name is required" }),
  host: z.string({ error: "Host is required" }),
  password: z.string({ error: "Password is required" }),
  port: z.number({ error: "Port is required" }),
  tls: z.boolean({ error: "TLS selection is required" }),
  username: z.string({ error: "Username is required" }),
});

/**
 * Either a connection URL (string) or a set of connection options must be provided
 *
 * Matches the {@link MySQLConnection} type
 */
const mysqlConnectionSchema = z.xor([z.url(), mysqlConnectionOptionsSchema], {
  error: "Connection must be either a URL or a set of connection options",
});

/**
 * Used to parse the MySQL config
 *
 * Matches the {@link MySQLConfig} type
 */
export const mysqlConfigSchema = z.object({
  connection: mysqlConnectionSchema,
  name: z.string({ error: "Service name is required" }),
  type: z.literal("mysql"),
});
