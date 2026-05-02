import { z } from "zod";

/**
 * Used to parse the Meilisearch search engine config
 *
 * Matches the {@link MeilisearchConfig} type
 */
export const meilisearchConfigSchema = z.object({
  apiKey: z.string().optional(),
  name: z.string(),
  type: z.literal("meilisearch"),
  url: z.string()
});
