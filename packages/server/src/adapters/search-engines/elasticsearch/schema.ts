import { z } from "zod";

/**
 * Used to parse the Elasticsearch search engine config
 *
 * Matches the {@link ElasticsearchConfig} type
 */
export const elasticsearchConfigSchema = z.object({
  apiKey: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  type: z.literal("elasticsearch"),
  url: z.string(),
  username: z.string().optional(),
});
