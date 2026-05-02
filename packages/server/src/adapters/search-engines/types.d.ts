/**
 * Generic search engine config type.
 */
interface SearchEngineConfig extends ServiceConfig {
  type: "elasticsearch" | "typesense" | "meilisearch";
}
