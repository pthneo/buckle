import { z } from "zod";

/**
 * Used to parse the connection options for a postgres database
 *
 * Matches the {@link PostgresConnectionOptions} type
 */
const postgresConnectionOptionsSchema = z.object({
  database: z.string({ error: "Database name is required" }),
  host: z.string({ error: "Host is required" }),
  password: z.string({ error: "Password is required" }),
  port: z.number({ error: "Port is required" }),
  tls: z.boolean({ error: "TLS selection is required" }),
  username: z.string({ error: "Username is required" }),
});

/**
 * Either a connection url or a set of connection options must be provided
 *
 * Matches the {@link PostgresConnection} type
 */
const postgresConnectionSchema = z.xor([z.url(), postgresConnectionOptionsSchema]);

/**
 * Used to parse the postgres config
 *
 * Matches the {@link PostgresConfig} type
 */
export const postgresConfigSchema = z.object({
  description: z.string().optional(),
  name: z.string(),
  type: z.literal("postgres"),
  connection: postgresConnectionSchema,
});
