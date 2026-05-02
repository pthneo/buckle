import { z } from "zod";
import { databaseConfigSchema } from "../adapters";
import { appConfigSchema } from "../adapters/apps/schema";
import { cacheConfigSchema } from "../adapters/caches/schema";
import { objectStorageConfigSchema } from "../adapters/object-stores/schema";
import { queueConfigSchema } from "../adapters/queues/schema";
import { searchEngineConfigSchema } from "../adapters/search-engines/schema";
import { webhookConfigSchema } from "../adapters/webhooks/schema";

const MIN_CONFIG_VERSION = 1;
const MAX_CONFIG_VERSION = 1;
export const DEFAULT_CONFIG_VERSION = 1;

/**
 * The expected config schema.
 *
 * Matches the {@link Config} type
 */
const configSchema = z.object({
  apps: z.array(appConfigSchema).optional().default([]),
  caches: z.array(cacheConfigSchema).optional().default([]),
  databases: z.array(databaseConfigSchema).optional().default([]),
  env: z.string().optional(),
  objectStorages: z.array(objectStorageConfigSchema).optional().default([]),
  queues: z.array(queueConfigSchema).optional().default([]),
  searchEngines: z.array(searchEngineConfigSchema).optional().default([]),
  version: z.number().min(MIN_CONFIG_VERSION).max(MAX_CONFIG_VERSION),
  webhooks: z.array(webhookConfigSchema).optional().default([])
});

/**
 * Validates the output of the yaml parser against the expected config schema.
 *
 * @param config - The config object to validate.
 * @throws If the config is invalid.
 * @returns The validated config object.
 */
export function validateConfig(config: unknown): Config {
  const result = configSchema.safeParse(config);
  if (!result.success) {
    throw new Error(JSON.stringify(z.treeifyError(result.error)));
  }
  return result.data;
}

// TODO: Fix, crashes on empty yml file
