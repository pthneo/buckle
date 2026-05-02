/**
 * Meilisearch search engine config type.
 */
interface MeilisearchConfig extends SearchEngineConfig {
  apiKey?: string;
  type: "meilisearch";
  url: string;
}
