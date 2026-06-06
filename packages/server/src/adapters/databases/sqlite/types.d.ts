/**
 * SQLite database config type.
 */
interface SQLiteConfig extends DatabaseConfig {
  // Used to connect to the database
  connection: SQLiteConnection;
  // Used to parse the config type
  type: "sqlite";
}

/**
 * Connection can be a path/URL string or SQL.Options for SQLite
 */
type SQLiteConnection = string | URL | ":memory:";

/**
 * Connection options for a SQLite database
 */
type SQLiteConnectionOptions = {
  adapter: "sqlite";
  filename: string;
  readonly: boolean;
  create: boolean;
  readwrite: boolean;
  strict: boolean;
  safeIntegers: boolean;
};
