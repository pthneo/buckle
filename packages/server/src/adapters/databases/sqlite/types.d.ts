/**
 * SQLite database config type.
 */
interface SQLiteConfig extends DatabaseConfig {
  // Used to connect to the database
  connection: SQLiteConnection;
  // The description of the service in the Buckle UI
  description?: string;
  // The name of the service in the Buckle UI
  name: string;
  // Used to parse the config type
  type: "sqlite";
}

/**
 * Connection can be a path/URL string or SQL.Options for SQLite
 */
type SQLiteConnection = string | URL | ":memory:";
