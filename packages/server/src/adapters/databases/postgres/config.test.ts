import { describe, expect, test } from "bun:test";
import { YAML } from "bun";
import { postgresConfigSchema } from "./schema";

const validConnectionOptions = {
  database: "myapp",
  host: "localhost",
  password: "secret",
  port: 5432,
  tls: false,
  username: "admin",
};

describe("Postgres config schema", () => {
  describe("Zod validation", () => {
    test("accepts a connection options object", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        connection: validConnectionOptions,
      });
      expect(result.success).toBe(true);
    });

    test("accepts a connection URL string", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        connection: "postgres://admin:secret@localhost:5432/myapp",
      });
      expect(result.success).toBe(true);
    });

    test("accepts optional description field", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        description: "Primary database",
        connection: validConnectionOptions,
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.description).toBe("Primary database");
      }
    });

    test("rejects missing name", () => {
      const result = postgresConfigSchema.safeParse({
        type: "postgres",
        connection: validConnectionOptions,
      });
      expect(result.success).toBe(false);
    });

    test("rejects missing connection", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
      });
      expect(result.success).toBe(false);
    });

    test("rejects wrong type literal", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "mysql",
        connection: validConnectionOptions,
      });
      expect(result.success).toBe(false);
    });

    test("rejects connection options with missing required fields", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        connection: {
          host: "localhost",
          port: 5432,
        },
      });
      expect(result.success).toBe(false);
    });

    test("rejects connection options with wrong port type", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        connection: {
          ...validConnectionOptions,
          port: "5432",
        },
      });
      expect(result.success).toBe(false);
    });

    test("rejects an invalid URL string", () => {
      const result = postgresConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        connection: "not-a-url",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("YAML parsing", () => {
    test("parses a postgres yaml block with connection options", () => {
      const yaml = `
name: primary
type: postgres
connection:
  host: localhost
  port: 5432
  database: myapp
  username: admin
  password: secret
  tls: false
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = postgresConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("primary");
        expect(result.data.type).toBe("postgres");
        const conn = result.data.connection as typeof validConnectionOptions;
        expect(conn.host).toBe("localhost");
        expect(conn.port).toBe(5432);
        expect(conn.database).toBe("myapp");
      }
    });

    test("parses a postgres yaml block with a connection URL", () => {
      const yaml = `
name: primary
type: postgres
connection: "postgres://admin:secret@localhost:5432/myapp"
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = postgresConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.connection).toBe("postgres://admin:secret@localhost:5432/myapp");
      }
    });

    test("parses a postgres yaml block with optional description", () => {
      const yaml = `
name: primary
type: postgres
description: Main production database
connection:
  host: db.example.com
  port: 5432
  database: production
  username: app
  password: hunter2
  tls: true
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = postgresConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.description).toBe("Main production database");
      }
    });

    test("fails validation on yaml missing required connection fields", () => {
      const yaml = `
name: my-db
type: postgres
connection:
  host: localhost
  port: 5432
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = postgresConfigSchema.safeParse(parsed);
      expect(result.success).toBe(false);
    });

    test("fails validation on yaml missing name", () => {
      const yaml = `
type: postgres
connection:
  host: localhost
  port: 5432
  database: myapp
  username: admin
  password: secret
  tls: false
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = postgresConfigSchema.safeParse(parsed);
      expect(result.success).toBe(false);
    });
  });
});
