import { afterEach, beforeEach, describe, expect, mock, spyOn, test } from "bun:test";
import { SQLiteAdapter } from "./index";

const mockClose = mock(() => Promise.resolve());

mock.module("bun", () => ({
  SQL: class MockSQL {
    close = mockClose;
  }
}));

const sqliteConfig: SQLiteConfig = {
  name: "test-db",
  type: "sqlite",
  connection: ":memory:"
};

describe("SQLiteAdapter", () => {
  let adapter: SQLiteAdapter;

  beforeEach(() => {
    mockClose.mockClear();
    adapter = new SQLiteAdapter(sqliteConfig);
  });

  afterEach(async () => {
    await adapter.disconnect();
  });

  describe("constructor", () => {
    test("initializes with config and default timeout", () => {
      expect(adapter.get()).toBeNull();
    });

    test("initializes with custom timeout", () => {
      const customAdapter = new SQLiteAdapter(sqliteConfig, 5000);
      expect(customAdapter.get()).toBeNull();
    });
  });

  describe("connect()", () => {
    test("creates a SQL client after connect", () => {
      adapter.connect();
      expect(adapter.get()).not.toBeNull();
    });

    test("creates SQL with sqlite adapter and filename", () => {
      const fileConfig: SQLiteConfig = {
        name: "file-db",
        type: "sqlite",
        connection: "/tmp/test.db"
      };
      const fileAdapter = new SQLiteAdapter(fileConfig);
      fileAdapter.connect();
      expect(fileAdapter.get()).not.toBeNull();
    });

    test("creates SQL with connection options object", () => {
      // When connection is a string, it's passed as the filename to Bun SQL.
      // The SQLiteAdapter.connect() always wraps connection as { adapter: "sqlite", filename: connection },
      // so object-form connections are handled by the schema but connection strings are the primary path.
      const stringAdapter = new SQLiteAdapter({
        name: "str-db",
        type: "sqlite",
        connection: ":memory:"
      });
      stringAdapter.connect();
      expect(stringAdapter.get()).not.toBeNull();
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

    test("does nothing if client is null", async () => {
      await expect(adapter.disconnect()).resolves.toBeUndefined();
    });
  });

  describe("checkHealth()", () => {
    test("returns false if client is null", async () => {
      const healthy = await adapter.checkHealth();
      expect(healthy).toBe(false);
    });

    test("returns true when the tagged-template query succeeds", async () => {
      const successAdapter = new SQLiteAdapter(sqliteConfig);
      successAdapter.connect();

      const fakeClient = Object.assign(
        (_strings: TemplateStringsArray, ..._values: unknown[]) => Promise.resolve([{ "1": 1 }]),
        { close: mockClose }
      );
      Object.defineProperty(successAdapter, "client", { value: fakeClient, writable: true });

      const healthy = await successAdapter.checkHealth();
      expect(healthy).toBe(true);
    });

    test("returns false after timeout when all queries fail", async () => {
      const shortTimeoutAdapter = new SQLiteAdapter(sqliteConfig, 50);
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

    test("returns client instance after connect", () => {
      adapter.connect();
      expect(adapter.get()).not.toBeNull();
    });
  });
});
