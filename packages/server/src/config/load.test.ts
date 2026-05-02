import { describe, expect, test } from "bun:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { loadConfig } from "./load";
import { DEFAULT_CONFIG_VERSION } from "./validation";

/**
 * Creates an empty config for tests
 *
 * @returns An empty config
 */
function emptyConfig(): Config {
  return {
    apps: [],
    caches: [],
    databases: [],
    objectStorages: [],
    queues: [],
    searchEngines: [],
    version: DEFAULT_CONFIG_VERSION,
    webhooks: []
  };
}

describe("loadConfig", () => {
  test("returns the inline default config when the resolved path does not exist", async () => {
    // resolve(path) + missing file triggers the early-return branch without touching YAML parsing.
    const missingPath = join(tmpdir(), `buckle-missing-${crypto.randomUUID()}.yaml`);

    const config = await loadConfig(missingPath);

    expect(config).toEqual(emptyConfig());
  });

  test("reads YAML from disk, parses it, and pipes through validateConfig", async () => {
    const dir = mkdtempSync(join(tmpdir(), "buckle-load-config-"));
    const filepath = join(dir, "config.yaml");
    writeFileSync(filepath, "version: 1\n");

    const config = await loadConfig(filepath);

    expect(config.version).toBe(1);
    expect(config.databases).toEqual([]);
  });

  test("on reload failure returns previous config instead of exiting when previous is provided", async () => {
    // Invalid persisted YAML triggers validateConfig errors inside loadConfig's try body.
    // Supplying `previous` opts into the graceful reload branch instead of process.exit.
    const dir = mkdtempSync(join(tmpdir(), "buckle-load-bad-"));
    const filepath = join(dir, "broken.yaml");
    writeFileSync(filepath, "version: totally-invalid");

    const previous = emptyConfig();

    const config = await loadConfig(filepath, previous);

    expect(config).toBe(previous);
  });
});
