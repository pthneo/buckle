/**
 * MySQL database config type.
 */
interface MySQLConfig extends DatabaseConfig {
  // Used to connect to the database
  connection: MySQLConnection;
  // The description of the service in the Buckle UI
  description?: string;
  // The name of the service in the Buckle UI
  name: string;
  // Used to parse the config type
  type: "mysql";
}

/**
 * Connection can be either a MySQL connection URL or a set of connection options
 */
type MySQLConnection = URL | MySQLConnectionOptions;

/**
 * Connection options for a MySQL database
 */
type MySQLConnectionOptions = {
  database: string;
  host: string;
  password: string;
  port: number;
  tls: boolean;
  username: string;
};
