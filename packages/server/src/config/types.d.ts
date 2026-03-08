/**
 * The main Buckle config object that the .yaml parser outputs.
 *
 * TODO: Add support for flexible environment variables. ie specifying them in the yaml file instead
 * of just using a .env file.
 */
interface Config {
  apps: AppConfig[];
  caches: CacheConfig[];
  databases: DatabaseConfig[];
  env?: string | undefined;
  objectStorages: ObjectStorageConfig[];
  queues: QueueConfig[];
  searchEngines: SearchEngineConfig[];
  version: number;
  webhooks: WebhookConfig[];
}
