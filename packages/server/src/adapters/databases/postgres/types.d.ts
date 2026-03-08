/**
 * PostgreSQL database config type.
 */
interface PostgresConfig extends DatabaseConfig {
  // Used to connect to the database
  connection: PostgresConnection;
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
  tls: boolean;
  username: string;
};
s;
