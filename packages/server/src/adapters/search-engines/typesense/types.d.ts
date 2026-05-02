/**
 * Typesense search engine config type.
 */
interface TypesenseConfig extends SearchEngineConfig {
  apiKey: string;
  type: "typesense";
  url: string;
}
