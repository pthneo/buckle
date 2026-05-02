import { z } from "zod";

/**
 * Used to parse the Typesense search engine config
 *
 * Matches the {@link TypesenseConfig} type
 */
export const typesenseConfigSchema = z.object({
  apiKey: z.string(),
  name: z.string(),
  type: z.literal("typesense"),
  url: z.string()
});
