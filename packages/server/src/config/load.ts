import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { file, YAML } from "bun";
import { EXIT_CODES } from "../error";
import { DEFAULT_CONFIG_VERSION, validateConfig } from "./validation";

/**
 * Loads and validates the config file.
 *
 * @param path - The path to the config file.
 * @throws If the config file is not found or is invalid. Exits with code 1.
 * @returns A valid Config object.
 */
export async function loadConfig(path: string): Promise<Config> {
  const filepath = resolve(path);
  if (!existsSync(filepath)) {
    console.warn("Config file not found, using default config.");
    return {
      version: DEFAULT_CONFIG_VERSION,
      apps: [],
      caches: [],
      databases: [],
      objectStorages: [],
      queues: [],
      searchEngines: [],
      webhooks: []
    };
  }

  try {
    const rawConfig = await file(filepath).text();
    const parsedConfig = await YAML.parse(rawConfig);
    return validateConfig(parsedConfig);
  } catch (error) {
    console.error("Failed to read config file:", error);
    process.exit(EXIT_CODES.INVALID_CONFIG);
  }
}
