import { z } from "zod";

/**
 * Used to parse app config
 *
 * Matches the {@link AppConfig} type
 */
export const appConfigSchema = z.object({
  healthEndpoint: z.string({ error: "Health endpoint is required" }),
  name: z.string({ error: "Name is required" }),
  url: z.string({ error: "URL is required" })
});
