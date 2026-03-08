import { describe, expect, test } from "bun:test";
import { YAML } from "bun";
import { sqliteConfigSchema } from "./schema";

describe("SQLite config schema", () => {
  describe("Zod validation", () => {
    test("accepts a string connection", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "my-db",
        type: "sqlite",
        connection: "/data/app.db"
      });
      expect(result.success).toBe(true);
    });

    test("accepts :memory: as a connection string", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "in-memory",
        type: "sqlite",
        connection: ":memory:"
      });
      expect(result.success).toBe(true);
    });

    test("accepts connection options object", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "my-db",
        type: "sqlite",
        connection: {
          filename: "/data/app.db",
          readonly: false,
          create: true,
          readwrite: true
        }
      });
      expect(result.success).toBe(true);
    });

    test("accepts connection options with all optional fields", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "my-db",
        type: "sqlite",
        connection: {
          adapter: "sqlite",
          filename: "/data/app.db",
          readonly: true,
          create: false,
          readwrite: false,
          strict: true,
          safeIntegers: true
        }
      });
      expect(result.success).toBe(true);
    });

    test("accepts an empty connection options object", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "my-db",
        type: "sqlite",
        connection: {}
      });
      expect(result.success).toBe(true);
    });

    test("rejects missing name", () => {
      const result = sqliteConfigSchema.safeParse({
        type: "sqlite",
        connection: "/data/app.db"
      });
      expect(result.success).toBe(false);
    });

    test("rejects missing connection", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "my-db",
        type: "sqlite"
      });
      expect(result.success).toBe(false);
    });

    test("rejects wrong type literal", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        connection: "/data/app.db"
      });
      expect(result.success).toBe(false);
    });

    test("rejects boolean as readonly with wrong type", () => {
      const result = sqliteConfigSchema.safeParse({
        name: "my-db",
        type: "sqlite",
        connection: {
          readonly: "yes"
        }
      });
      expect(result.success).toBe(false);
    });
  });

  describe("YAML parsing", () => {
    test("parses a minimal sqlite yaml block", () => {
      const yaml = `
name: my-db
type: sqlite
connection: /data/app.db
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = sqliteConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("my-db");
        expect(result.data.type).toBe("sqlite");
        expect(result.data.connection).toBe("/data/app.db");
      }
    });

    test("parses a sqlite yaml block with connection options", () => {
      const yaml = `
name: app-db
type: sqlite
connection:
  filename: /var/data/app.db
  readonly: false
  create: true
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = sqliteConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.connection).toMatchObject({
          filename: "/var/data/app.db",
          readonly: false,
          create: true
        });
      }
    });

    test("parses an in-memory sqlite yaml block", () => {
      const yaml = `
name: test-db
type: sqlite
connection: ":memory:"
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = sqliteConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.connection).toBe(":memory:");
      }
    });

    test("fails validation on yaml missing required fields", () => {
      const yaml = `
type: sqlite
connection: /data/app.db
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = sqliteConfigSchema.safeParse(parsed);
      expect(result.success).toBe(false);
    });
  });
});
