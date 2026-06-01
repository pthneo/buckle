import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { PostgresAdapter } from "./index";

const mockClose = mock(() => Promise.resolve());

mock.module("bun", () => ({
  SQL: class MockSQL {
    close = mockClose;
  },
}));

const validConnectionOptions: PostgresConnectionOptions = {
  database: "testdb",
  host: "localhost",
  password: "secret",
  port: 5432,
  tls: false,
  username: "admin",
};

const postgresConfig: PostgresConfig = {
  name: "test-pg",
  type: "postgres",
  connection: validConnectionOptions,
};

const postgresUrlConfig: PostgresConfig = {
  name: "test-pg-url",
  type: "postgres",
  connection: new URL("postgres://admin:secret@localhost:5432/testdb"),
};

describe("PostgresAdapter", () => {
  let adapter: PostgresAdapter;

  beforeEach(() => {
    mockClose.mockClear();
    adapter = new PostgresAdapter(postgresConfig, 50);
  });

  afterEach(async () => {
    await adapter.disconnect();
  });

  describe("constructor", () => {
    test("initializes with null client", () => {
      expect(adapter.get()).toBeNull();
    });

    test("initializes with custom timeout", () => {
      const customAdapter = new PostgresAdapter(postgresConfig, 5000);
      expect(customAdapter.get()).toBeNull();
    });
  });

  describe("connect()", () => {
    test("creates a SQL client after connect", () => {
      adapter.connect();
      expect(adapter.get()).not.toBeNull();
    });

    test("creates a SQL client with URL connection", () => {
      const urlAdapter = new PostgresAdapter(postgresUrlConfig);
      urlAdapter.connect();
      expect(urlAdapter.get()).not.toBeNull();
    });

    test("creates a SQL client with options connection", () => {
      const optsAdapter = new PostgresAdapter(postgresConfig);
      optsAdapter.connect();
      expect(optsAdapter.get()).not.toBeNull();
    });
  });

  describe("disconnect()", () => {
    test("calls close on the client", async () => {
      adapter.connect();
      const client = adapter.get() as unknown as { close: typeof mockClose };
      const closeSpy = spyOn(client, "close").mockResolvedValue(undefined);
      await adapter.disconnect();
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    test("does nothing when client is null", async () => {
      await expect(adapter.disconnect()).resolves.toBeUndefined();
    });
  });

  describe("checkHealth()", () => {
    test("returns false if client is null", async () => {
      const healthy = await adapter.checkHealth();
      expect(healthy).toBe(false);
    });

    test("returns false after timeout when queries fail", async () => {
      const shortTimeoutAdapter = new PostgresAdapter(postgresConfig, 50);
      shortTimeoutAdapter.connect();

      const failingTemplate = (_strings: TemplateStringsArray, ..._values: unknown[]) =>
        Promise.reject(new Error("connection refused"));
      Object.defineProperty(shortTimeoutAdapter, "client", {
        value: failingTemplate,
        writable: true,
      });

      const healthy = await shortTimeoutAdapter.checkHealth();
      expect(healthy).toBe(false);
    }, 500);
  });

  describe("get()", () => {
    test("returns null before connect", () => {
      expect(adapter.get()).toBeNull();
    });

    test("returns client after connect", () => {
      adapter.connect();
      expect(adapter.get()).not.toBeNull();
    });
  });
});
