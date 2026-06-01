import type { SQL } from "bun";
import type { Adapter } from "../adapter";
import { MySQLAdapter } from "./mysql";
import { PostgresAdapter } from "./postgres";
import { SQLiteAdapter } from "./sqlite";

/**
 * Creates a database adapter based on the config.
 *
 * @param config - The database config.
 * @returns The database adapter.
 */
export function createDatabaseAdapter(
  config: DatabaseConfig
): Adapter<SQL, DatabaseConfig> | undefined {
  switch (config.type) {
    case "postgres":
      return new PostgresAdapter(config as PostgresConfig);
    case "mysql":
      return new MySQLAdapter(config as MySQLConfig);
    case "sqlite":
      return new SQLiteAdapter(config as SQLiteConfig);
    default:
      return;
  }
}

export { databaseConfigSchema } from "./schema";
