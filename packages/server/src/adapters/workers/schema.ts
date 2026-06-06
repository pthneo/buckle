import { z } from "zod";

/**
 * Used to parse worker config
 *
 * Matches the {@link WorkerConfig} type
 */
export const workerConfigSchema = z.object({
  healthEndpoint: z.string({ error: "Health endpoint is required" }),
  name: z.string({ error: "Name is required" }),
  url: z.string({ error: "URL is required" }),
});
