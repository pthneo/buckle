/**
 * Redis queue config type.
 */
interface RedisQueueConfig extends QueueConfig {
  host?: string;
  password?: string;
  port?: number;
  tls?: boolean;
  type: "redis";
  url?: string;
  username?: string;
}
