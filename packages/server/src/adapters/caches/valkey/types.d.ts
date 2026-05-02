/**
 * Valkey cache config type.
 */
interface ValkeyConfig extends CacheConfig {
  host?: string;
  password?: string;
  port?: number;
  tls?: boolean;
  type: "valkey";
  url?: string;
  username?: string;
}
