/**
 * Generic database config type.
 */
interface DatabaseConfig extends ServiceConfig {
  type: "postgres" | "mysql" | "sqlite" | "mongodb";
}
