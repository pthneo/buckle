/**
 * Redis cache config type.
 */
interface RedisConfig extends CacheConfig {
  host?: string;
  password?: string;
  port?: number;
  tls?: boolean;
  type: "redis";
  url?: string;
  username?: string;
}
