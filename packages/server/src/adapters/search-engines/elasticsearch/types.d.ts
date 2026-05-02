/**
 * Elasticsearch search engine config type.
 */
interface ElasticsearchConfig extends SearchEngineConfig {
  apiKey?: string;
  password?: string;
  type: "elasticsearch";
  url: string;
  username?: string;
}
