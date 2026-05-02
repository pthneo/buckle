import { z } from "zod";

/**
 * Used to parse the Valkey cache config
 *
 * Matches the {@link ValkeyConfig} type
 */
export const valkeyConfigSchema = z.object({
  host: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  tls: z.boolean().optional(),
  type: z.literal("valkey"),
  url: z.string().optional(),
  username: z.string().optional()
});
