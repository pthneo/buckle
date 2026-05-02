/**
 * Generic cache config type.
 */
interface CacheConfig extends ServiceConfig {
  type: "redis" | "valkey";
}
