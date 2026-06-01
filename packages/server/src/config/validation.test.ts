import { describe, expect, test } from "bun:test";
import { YAML } from "bun";
import { DEFAULT_CONFIG_VERSION, validateConfig } from "./validation";

// Default values
const EMPTY_DEFAULTS: Pick<
  Config,
  "apps" | "caches" | "databases" | "objectStorages" | "queues" | "searchEngines" | "webhooks"
> = {
  apps: [],
  caches: [],
  databases: [],
  objectStorages: [],
  queues: [],
  searchEngines: [],
  webhooks: [],
};

describe("validateConfig", () => {
  test("throws when the root schema cannot coerce inputs (invalid version type)", () => {
    // Unquoted YAML scalar `foo` becomes the string "foo"; version must be a number in [1, 1].
    const yaml = "version: foo";
    const parsed = YAML.parse(yaml.trim()) as unknown;

    expect(() => validateConfig(parsed)).toThrow();
  });

  test("accepts a minimal document and fills omitted arrays with defaults", () => {
    const yaml = "version: 1";
    const parsed = YAML.parse(yaml.trim()) as unknown;

    const config = validateConfig(parsed);

    expect(config).toEqual({
      ...EMPTY_DEFAULTS,
      version: 1,
    });
  });

  test("numeric YAML scalar 1.0 still validates as version 1", () => {
    const yaml = "version: 1.0";
    const parsed = YAML.parse(yaml.trim()) as unknown;

    const config = validateConfig(parsed);

    expect(config.version).toBe(1);
  });

  test("accepts optional env field alongside arrays", () => {
    const config = validateConfig({
      ...EMPTY_DEFAULTS,
      env: "production",
      version: DEFAULT_CONFIG_VERSION,
    });

    expect(config.env).toBe("production");
  });

  test("accepts a sqlite database entry shape required by databaseConfigSchema", () => {
    const config = validateConfig({
      ...EMPTY_DEFAULTS,
      databases: [
        {
          connection: ":memory:",
          name: "local-sqlite",
          type: "sqlite",
        },
      ],
      version: DEFAULT_CONFIG_VERSION,
    });

    expect(config.databases).toHaveLength(1);
    expect(config.databases[0]?.type).toBe("sqlite");
    expect(config.databases[0]?.name).toBe("local-sqlite");
  });

  test("throws when version is below the supported range", () => {
    expect(() =>
      validateConfig({
        ...EMPTY_DEFAULTS,
        version: 0,
      })
    ).toThrow();
  });

  test("throws when version is above the supported range", () => {
    expect(() =>
      validateConfig({
        ...EMPTY_DEFAULTS,
        version: 2,
      })
    ).toThrow();
  });

  test("throws when a database row violates its discriminated union", () => {
    expect(() =>
      validateConfig({
        ...EMPTY_DEFAULTS,
        databases: [{ connection: ":memory:", name: "x", type: "mongodb" }],
        version: DEFAULT_CONFIG_VERSION,
      })
    ).toThrow();
  });
});
