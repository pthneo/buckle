/**
 * @description .yaml config file type definitions
 */

/**
 * The main Buckle config object that the .yaml parser outputs.
 */
export interface Config {
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

/**
 * A web application or worker config object.
 *
 * TODO: Figure out how to handle log forwarding.
 */
export interface AppConfig {
  healthEndpoint?: string;
  logsEndpoint?: string;
  name: string;
  type: "app" | "worker";
  url: string;
}

/**
 * Generic database config type.
 */
export type DatabaseConfig = PostgresConfig | MySQLConfig | SQLiteConfig | MongoDBConfig;

/**
 * PostgreSQL database config type.
 */
export interface PostgresConfig {
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
export interface MySQLConfig {
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
export interface SQLiteConfig {
  name: string;
  path: string;
  type: "sqlite";
}

/**
 * MongoDB database config type.
 */
export interface MongoDBConfig {
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
export type CacheConfig = RedisConfig | ValkeyConfig;

/**
 * Redis cache config type.
 */
export interface RedisConfig {
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
export interface ValkeyConfig {
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
export type ObjectStorageConfig = S3Config | R2Config | MinioConfig;

/**
 * S3 object storage config type.
 */
export interface S3Config {
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
export interface R2Config {
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
export interface MinioConfig {
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
export type SearchEngineConfig = ElasticsearchConfig | TypesenseConfig | MeilisearchConfig;

/**
 * Elasticsearch search engine config type.
 */
export interface ElasticsearchConfig {
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
export interface TypesenseConfig {
  apiKey: string;
  name: string;
  type: "typesense";
  url: string;
}

/**
 * Meilisearch search engine config type.
 */
export interface MeilisearchConfig {
  apiKey?: string;
  name: string;
  type: "meilisearch";
  url: string;
}

/**
 * Generic queue config type.
 */
export type QueueConfig = RedisQueueConfig | SQSConfig | RabbitMQConfig | KafkaConfig;

/**
 * Redis queue config type.
 */
export interface RedisQueueConfig {
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
export interface SQSConfig {
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
export interface RabbitMQConfig {
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
