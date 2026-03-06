/**
 * PostgreSQL database config type.
 */
interface PostgresConfig extends DatabaseConfig {
  // Used to connect to the database
  connection: PostgresConnection;
  // The description of the service in the Buckle UI
  description?: string;
  // The name of the service in the Buckle UI
  name: string;
  // Used to parse the config type
  type: "postgres";
}

/**
 * Connection can be either a postgres connection url or a set of connection options
 */
type PostgresConnection = URL | PostgresConnectionOptions;

/**
 * Connection options for a postgres database
 */
type PostgresConnectionOptions = {
  database: string;
  host: string;
  password: string;
  port: number;
  ssl: boolean;
  username: string;
};
