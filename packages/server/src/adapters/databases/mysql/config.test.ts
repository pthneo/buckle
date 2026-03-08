import { describe, expect, test } from "bun:test";
import { YAML } from "bun";
import { mysqlConfigSchema } from "./schema";

const validConnectionOptions = {
  database: "myapp",
  host: "localhost",
  password: "secret",
  port: 3306,
  tls: false,
  username: "admin"
};

describe("MySQL config schema", () => {
  describe("Zod validation", () => {
    test("accepts a connection options object", () => {
      const result = mysqlConfigSchema.safeParse({
        name: "my-db",
        type: "mysql",
        connection: validConnectionOptions
      });
      expect(result.success).toBe(true);
    });

    test("accepts a connection URL string", () => {
      const result = mysqlConfigSchema.safeParse({
        name: "my-db",
        type: "mysql",
        connection: "mysql://admin:secret@localhost:3306/myapp"
      });
      expect(result.success).toBe(true);
    });

    test("rejects missing name", () => {
      const result = mysqlConfigSchema.safeParse({
        type: "mysql",
        connection: validConnectionOptions
      });
      expect(result.success).toBe(false);
    });

    test("rejects missing connection", () => {
      const result = mysqlConfigSchema.safeParse({
        name: "my-db",
        type: "mysql"
      });
      expect(result.success).toBe(false);
    });

    test("rejects wrong type literal", () => {
      const result = mysqlConfigSchema.safeParse({
        name: "my-db",
        type: "postgres",
        connection: validConnectionOptions
      });
      expect(result.success).toBe(false);
    });

    test("rejects connection options with missing required fields", () => {
      const result = mysqlConfigSchema.safeParse({
        name: "my-db",
        type: "mysql",
        connection: {
          host: "localhost",
          port: 3306
        }
      });
      expect(result.success).toBe(false);
    });

    test("rejects connection options with wrong port type", () => {
      const result = mysqlConfigSchema.safeParse({
        name: "my-db",
        type: "mysql",
        connection: {
          ...validConnectionOptions,
          port: "3306"
        }
      });
      expect(result.success).toBe(false);
    });

    test("rejects an invalid URL string", () => {
      const result = mysqlConfigSchema.safeParse({
        name: "my-db",
        type: "mysql",
        connection: "not-a-url"
      });
      expect(result.success).toBe(false);
    });
  });

  describe("YAML parsing", () => {
    test("parses a mysql yaml block with connection options", () => {
      const yaml = `
name: primary
type: mysql
connection:
  host: localhost
  port: 3306
  database: myapp
  username: admin
  password: secret
  tls: false
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = mysqlConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("primary");
        expect(result.data.type).toBe("mysql");
        const conn = result.data.connection as typeof validConnectionOptions;
        expect(conn.host).toBe("localhost");
        expect(conn.port).toBe(3306);
        expect(conn.database).toBe("myapp");
      }
    });

    test("parses a mysql yaml block with a connection URL", () => {
      const yaml = `
name: primary
type: mysql
connection: "mysql://admin:secret@localhost:3306/myapp"
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = mysqlConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.connection).toBe("mysql://admin:secret@localhost:3306/myapp");
      }
    });

    test("parses a mysql yaml block with TLS enabled", () => {
      const yaml = `
name: secure-db
type: mysql
connection:
  host: db.example.com
  port: 3306
  database: production
  username: app
  password: hunter2
  tls: true
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = mysqlConfigSchema.safeParse(parsed);
      expect(result.success).toBe(true);
      if (result.success) {
        const conn = result.data.connection as typeof validConnectionOptions;
        expect(conn.tls).toBe(true);
      }
    });

    test("fails validation on yaml missing required connection fields", () => {
      const yaml = `
name: my-db
type: mysql
connection:
  host: localhost
  port: 3306
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = mysqlConfigSchema.safeParse(parsed);
      expect(result.success).toBe(false);
    });

    test("fails validation on yaml missing name", () => {
      const yaml = `
type: mysql
connection:
  host: localhost
  port: 3306
  database: myapp
  username: admin
  password: secret
  tls: false
      `.trim();

      const parsed = YAML.parse(yaml);
      const result = mysqlConfigSchema.safeParse(parsed);
      expect(result.success).toBe(false);
    });
  });
});
