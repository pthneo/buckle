import { z } from "zod";

/**
 * Used to parse app config
 *
 * Matches the {@link AppConfig} type
 */
export const appConfigSchema = z.object({
  healthEndpoint: z.url({ error: "Health endpoint is required" }),
  name: z.string({ error: "Service name is required" }),
  url: z.url({ error: "URL is required" }),
});
