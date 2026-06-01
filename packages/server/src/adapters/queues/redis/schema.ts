import { z } from "zod";

/**
 * Used to parse the Redis queue config
 *
 * Matches the {@link RedisQueueConfig} type
 */
export const redisQueueConfigSchema = z.object({
  host: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  tls: z.boolean().optional(),
  type: z.literal("redis"),
  url: z.string().optional(),
  username: z.string().optional(),
});
