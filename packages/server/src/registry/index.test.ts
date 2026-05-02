import { describe, expect, test } from "bun:test";
import { DEFAULT_CONFIG_VERSION } from "@/config";
import { ServiceRegistry } from "@/registry";

/**
 * Creates a base config for tests then overrides with values provided
 *
 * @param overrides - The overrides to apply to the base config
 * @returns A base config
 */
function baseConfig(overrides: Partial<Config> = {}): Config {
  return {
    apps: [],
    caches: [],
    databases: [],
    objectStorages: [],
    queues: [],
    searchEngines: [],
    version: DEFAULT_CONFIG_VERSION,
    webhooks: [],
    ...overrides
  };
}
/**
 * Creates a SQLite database config for tests
 *
 * @param name - The name of the database
 * @returns A SQLite database config
 */
function sqliteDatabase(name: string): SQLiteConfig {
  return {
    connection: ":memory:",
    name,
    type: "sqlite"
  };
}

/**
 * Returns the ids of the databases in the registry
 *
 * @param registry - The registry to get the database entry ids from
 * @returns The ids of the databases in the registry
 */
function databaseEntryIds(registry: ServiceRegistry): string[] {
  type BucketKey =
    | "apps"
    | "caches"
    | "databases"
    | "object-stores"
    | "queues"
    | "search-engines"
    | "webhooks";

  const buckets = (registry as unknown as { services: Map<BucketKey, Map<string, Service>> })
    .services;
  const bucket = buckets.get("databases");
  return bucket ? [...bucket.keys()] : [];
}

describe("ServiceRegistry", () => {
  test("starts with empty database bucket when config lists no databases", () => {
    const registry = new ServiceRegistry(baseConfig());

    expect(registry.getCategory("databases")).toEqual([]);
  });

  test("registers sqlite databases under the databases category", () => {
    const registry = new ServiceRegistry(
      baseConfig({
        databases: [sqliteDatabase("primary-sqlite")]
      })
    );

    const databases = registry.getCategory("databases");

    expect(databases).toHaveLength(1);
    expect(databases[0]?.name).toBe("primary-sqlite");
    expect(databases[0]?.type).toBe("sqlite");
    expect(databases[0]?.status).toBe("unknown");
  });

  test("connect wires adapters so subsequent health checks can succeed", async () => {
    const registry = new ServiceRegistry(
      baseConfig({
        databases: [sqliteDatabase("live-sqlite")]
      })
    );

    registry.connect();
    await registry.checkHealth();

    expect(registry.getCategory("databases")[0]?.status).toBe("healthy");
  });

  test("getService returns undefined when the id is not present in the bucket", () => {
    const registry = new ServiceRegistry(baseConfig());

    expect(registry.getService("databases", "does-not-exist")).toBeUndefined();
  });

  test("getService returns the registered row when the generated UUID is known", () => {
    const registry = new ServiceRegistry(
      baseConfig({
        databases: [sqliteDatabase("lookup-sqlite")]
      })
    );

    const ids = databaseEntryIds(registry);
    expect(ids).toHaveLength(1);

    const id = ids[0];
    if (id === undefined) {
      throw new Error("expected one synthetic database id");
    }

    const row = registry.getService("databases", id);

    expect(row?.name).toBe("lookup-sqlite");
    expect(row?.type).toBe("sqlite");
  });

  test("disconnect awaits adapter teardown and clears every category bucket", async () => {
    const registry = new ServiceRegistry(
      baseConfig({
        databases: [sqliteDatabase("tmp-sqlite")]
      })
    );

    registry.connect();
    await registry.disconnect();

    expect(registry.getCategory("databases")).toEqual([]);
  });
});
