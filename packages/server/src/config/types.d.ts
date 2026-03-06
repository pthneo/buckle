/**
 * @description .yaml config file type definitions
 */

/**
 * The main Buckle config object that the .yaml parser outputs.
 */
interface Config {
  apps?: AppConfig[];
  caches?: CacheConfig[];
  databases?: DatabaseConfig[];
  env?: string;
  objectStorages?: ObjectStorageConfig[];
  queues?: QueueConfig[];
  searchEngines?: SearchEngineConfig[];
  version: number;
  webhooks?: WebhookConfig[];
}

interface ServiceConfig {
  name: string;
  type: string;
}

/**
 * A web application or worker config object.
 *
 * TODO: Figure out how to handle log forwarding.
 */
interface AppConfig {
  healthEndpoint?: string;
  logsEndpoint?: string;
  name: string;
  type: "app" | "worker";
  url: string;
}

/**
 * Generic database config type.
 */
interface DatabaseConfig {
  name: string;
  type: string;
}

/**
 * PostgreSQL database config type.
 */
interface PostgresConfig {
  database: string;
  host: string;
  name: string;
  password?: string;
  port?: number;
  ssl?: boolean;
  type: "postgres";
  username?: string;
}

/**
 * MySQL database config type.
 */
interface MySQLConfig {
  database: string;
  host: string;
  name: string;
  password?: string;
  port?: number;
  type: "mysql";
  username?: string;
}

/**
 * SQLite database config type.
 */
interface SQLiteConfig {
  name: string;
  path: string;
  type: "sqlite";
}

/**
 * MongoDB database config type.
 */
interface MongoDBConfig {
  database?: string;
  host: string;
  name: string;
  password?: string;
  port?: number;
  type: "mongodb";
  username?: string;
}

/**
 * Generic cache config type.
 */
type CacheConfig = RedisConfig | ValkeyConfig;

/**
 * Redis cache config type.
 */
interface RedisConfig {
  host?: string;
  name: string;
  password?: string;
  port?: number;
  tls?: boolean;
  type: "redis";
  url?: string;
  username?: string;
}

/**
 * Valkey cache config type.
 */
interface ValkeyConfig {
  host?: string;
  name: string;
  password?: string;
  port?: number;
  tls?: boolean;
  type: "valkey";
  url?: string;
  username?: string;
}

/**
 * Generic object storage config type.
 */
type ObjectStorageConfig = S3Config | R2Config | MinioConfig;

/**
 * S3 object storage config type.
 */
interface S3Config {
  accessKeyId: string;
  bucket?: string;
  endpoint?: string;
  name: string;
  region?: string;
  secretAccessKey: string;
  type: "s3";
}

/**
 * R2 object storage config type.
 */
interface R2Config {
  accessKeyId: string;
  accountId: string;
  bucket?: string;
  name: string;
  region?: string;
  secretAccessKey: string;
  type: "r2";
}

/**
 * Minio object storage config type.
 */
interface MinioConfig {
  accessKeyId: string;
  bucket?: string;
  endpoint: string;
  name: string;
  region?: string;
  secretAccessKey: string;
  type: "minio";
}

/**
 * Generic search engine config type.
 */
type SearchEngineConfig = ElasticsearchConfig | TypesenseConfig | MeilisearchConfig;

/**
 * Elasticsearch search engine config type.
 */
interface ElasticsearchConfig {
  apiKey?: string;
  name: string;
  password?: string;
  type: "elasticsearch";
  url: string;
  username?: string;
}

/**
 * Typesense search engine config type.
 */
interface TypesenseConfig {
  apiKey: string;
  name: string;
  type: "typesense";
  url: string;
}

/**
 * Meilisearch search engine config type.
 */
interface MeilisearchConfig {
  apiKey?: string;
  name: string;
  type: "meilisearch";
  url: string;
}

/**
 * Generic queue config type.
 */
type QueueConfig = RedisQueueConfig | SQSConfig | RabbitMQConfig | KafkaConfig;

/**
 * Redis queue config type.
 */
interface RedisQueueConfig {
  host?: string;
  name: string;
  password?: string;
  port?: number;
  tls?: boolean;
  type: "redis";
  url?: string;
  username?: string;
}

/**
 * SQS queue config type.
 */
interface SQSConfig {
  accessKeyId: string;
  name: string;
  region: string;
  secretAccessKey: string;
  type: "sqs";
  url: string;
}

/**
 * RabbitMQ queue config type.
 */
interface RabbitMQConfig {
  name: string;
  type: "rabbitmq";
  url: string;
}

/**
 * Kafka queue config type.
 */
export interface KafkaConfig {
  brokers: string[];
  name: string;
  type: "kafka";
}

/**
 * Webhook config type.
 */
export interface WebhookConfig {
  name: string;
  type: "webhook";
  url: string;
}
