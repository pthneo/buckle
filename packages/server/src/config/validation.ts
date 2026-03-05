import { z } from "zod";
import type { Config } from "./types";

const appConfigSchema = z.object({
  healthEndpoint: z.string().optional(),
  logsEndpoint: z.string().optional(),
  name: z.string(),
  type: z.enum(["app", "worker"]),
  url: z.string()
});

const postgresConfigSchema = z.object({
  database: z.string(),
  host: z.string(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  ssl: z.boolean().optional(),
  type: z.literal("postgres"),
  username: z.string().optional()
});

const mysqlConfigSchema = z.object({
  database: z.string(),
  host: z.string(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  type: z.literal("mysql"),
  username: z.string().optional()
});

const sqliteConfigSchema = z.object({
  name: z.string(),
  path: z.string(),
  type: z.literal("sqlite")
});

const mongodbConfigSchema = z.object({
  database: z.string().optional(),
  host: z.string(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  type: z.literal("mongodb"),
  username: z.string().optional()
});

const databaseConfigSchema = z.discriminatedUnion("type", [
  postgresConfigSchema,
  mysqlConfigSchema,
  sqliteConfigSchema,
  mongodbConfigSchema
]);

// ─── Caches ──────────────────────────────────────────────────────────────────

const redisConfigSchema = z.object({
  host: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  tls: z.boolean().optional(),
  type: z.literal("redis"),
  url: z.string().optional(),
  username: z.string().optional()
});

const valkeyConfigSchema = z.object({
  host: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  tls: z.boolean().optional(),
  type: z.literal("valkey"),
  url: z.string().optional(),
  username: z.string().optional()
});

const cacheConfigSchema = z.discriminatedUnion("type", [redisConfigSchema, valkeyConfigSchema]);

const s3ConfigSchema = z.object({
  accessKeyId: z.string(),
  bucket: z.string().optional(),
  endpoint: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  secretAccessKey: z.string(),
  type: z.literal("s3")
});

const r2ConfigSchema = z.object({
  accessKeyId: z.string(),
  accountId: z.string(),
  bucket: z.string().optional(),
  name: z.string(),
  region: z.string().optional(),
  secretAccessKey: z.string(),
  type: z.literal("r2")
});

const minioConfigSchema = z.object({
  accessKeyId: z.string(),
  bucket: z.string().optional(),
  endpoint: z.string(),
  name: z.string(),
  region: z.string().optional(),
  secretAccessKey: z.string(),
  type: z.literal("minio")
});

const objectStorageConfigSchema = z.discriminatedUnion("type", [
  s3ConfigSchema,
  r2ConfigSchema,
  minioConfigSchema
]);

const elasticsearchConfigSchema = z.object({
  apiKey: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  type: z.literal("elasticsearch"),
  url: z.string(),
  username: z.string().optional()
});

const typesenseConfigSchema = z.object({
  apiKey: z.string(),
  name: z.string(),
  type: z.literal("typesense"),
  url: z.string()
});

const meilisearchConfigSchema = z.object({
  apiKey: z.string().optional(),
  name: z.string(),
  type: z.literal("meilisearch"),
  url: z.string()
});

const searchEngineConfigSchema = z.discriminatedUnion("type", [
  elasticsearchConfigSchema,
  typesenseConfigSchema,
  meilisearchConfigSchema
]);

const redisQueueConfigSchema = z.object({
  host: z.string().optional(),
  name: z.string(),
  password: z.string().optional(),
  port: z.number().optional(),
  tls: z.boolean().optional(),
  type: z.literal("redis"),
  url: z.string().optional(),
  username: z.string().optional()
});

const sqsConfigSchema = z.object({
  accessKeyId: z.string(),
  name: z.string(),
  region: z.string(),
  secretAccessKey: z.string(),
  type: z.literal("sqs"),
  url: z.string()
});

const rabbitmqConfigSchema = z.object({
  name: z.string(),
  type: z.literal("rabbitmq"),
  url: z.string()
});

const kafkaConfigSchema = z.object({
  brokers: z.array(z.string()),
  name: z.string(),
  type: z.literal("kafka")
});

const queueConfigSchema = z.discriminatedUnion("type", [
  redisQueueConfigSchema,
  sqsConfigSchema,
  rabbitmqConfigSchema,
  kafkaConfigSchema
]);

// ─── Webhooks ────────────────────────────────────────────────────────────────

const webhookConfigSchema = z.object({
  name: z.string(),
  type: z.literal("webhook"),
  url: z.string()
});

// ─── Config ──────────────────────────────────────────────────────────────────

const configSchema = z.object({
  apps: z.array(appConfigSchema).optional(),
  caches: z.array(cacheConfigSchema).optional(),
  databases: z.array(databaseConfigSchema).optional(),
  env: z.string().optional(),
  objectStorages: z.array(objectStorageConfigSchema).optional(),
  queues: z.array(queueConfigSchema).optional(),
  searchEngines: z.array(searchEngineConfigSchema).optional(),
  version: z.number(),
  webhooks: z.array(webhookConfigSchema).optional()
});

/**
 * Validates the output of the yaml parser against the expected config schema.
 */
export function validateConfig(config: unknown): Config | null {
  const result = configSchema.safeParse(config);
  if (!result.success) {
    console.error("Invalid config file.", z.treeifyError(result.error));
    return null;
  }
  return result.data as Config;
}
