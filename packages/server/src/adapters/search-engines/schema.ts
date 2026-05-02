import { z } from "zod";
import { elasticsearchConfigSchema } from "./elasticsearch/schema";
import { meilisearchConfigSchema } from "./meilisearch/schema";
import { typesenseConfigSchema } from "./typesense/schema";

/**
 * Used to parse the search engine config
 */
export const searchEngineConfigSchema = z.discriminatedUnion("type", [
  elasticsearchConfigSchema,
  typesenseConfigSchema,
  meilisearchConfigSchema
]);
