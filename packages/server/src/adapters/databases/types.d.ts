/**
 * Generic database config type.
 *
 * TODO: Support non-relational databases like MongoDB, Neo4j, etc.
 */
interface DatabaseConfig extends ServiceConfig {
  type: "postgres" | "mysql" | "sqlite";
}
