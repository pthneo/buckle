import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { MySQLAdapter } from "./index";

const mockClose = mock(() => Promise.resolve());

mock.module("bun", () => ({
  SQL: class MockSQL {
    close = mockClose;
  }
}));

const validConnectionOptions: MySQLConnectionOptions = {
  database: "testdb",
  host: "localhost",
  password: "secret",
  port: 3306,
  tls: false,
  username: "admin"
};

const mysqlConfig: MySQLConfig = {
  name: "test-mysql",
  type: "mysql",
  connection: validConnectionOptions
};

const mysqlUrlConfig: MySQLConfig = {
  name: "test-mysql-url",
  type: "mysql",
  connection: new URL("mysql://admin:secret@localhost:3306/testdb")
};

describe("MySQLAdapter", () => {
  let adapter: MySQLAdapter;

  beforeEach(() => {
    mockClose.mockClear();
    adapter = new MySQLAdapter(mysqlConfig, 50);
  });

  afterEach(async () => {
    await adapter.disconnect();
  });

  describe("constructor", () => {
    test("initializes with null client", () => {
      expect(adapter.get()).toBeNull();
    });

    test("initializes with custom timeout", () => {
      const customAdapter = new MySQLAdapter(mysqlConfig, 5000);
      expect(customAdapter.get()).toBeNull();
    });
  });

  describe("connect()", () => {
    test("creates a SQL client after connect", () => {
      adapter.connect();
      expect(adapter.get()).not.toBeNull();
    });

    test("creates a SQL client with URL connection", () => {
      const urlAdapter = new MySQLAdapter(mysqlUrlConfig);
      urlAdapter.connect();
      expect(urlAdapter.get()).not.toBeNull();
    });

    test("creates a SQL client with options connection", () => {
      const optsAdapter = new MySQLAdapter(mysqlConfig);
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
      const shortTimeoutAdapter = new MySQLAdapter(mysqlConfig, 50);
      shortTimeoutAdapter.connect();

      const failingTemplate = (_strings: TemplateStringsArray, ..._values: unknown[]) =>
        Promise.reject(new Error("connection refused"));
      Object.defineProperty(shortTimeoutAdapter, "client", {
        value: failingTemplate,
        writable: true
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
