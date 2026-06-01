import { z } from "zod";
import { redisConfigSchema } from "./redis/schema";
import { valkeyConfigSchema } from "./valkey/schema";

/**
 * Used to parse the cache config
 */
export const cacheConfigSchema = z.discriminatedUnion("type", [
  redisConfigSchema,
  valkeyConfigSchema,
]);
