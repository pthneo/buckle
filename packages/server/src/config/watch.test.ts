import { describe, expect, test } from "bun:test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { watchConfig } from "./watch";

describe("watchConfig", () => {
  test("returns a filesystem watcher that can be closed without throwing", () => {
    // Real watchers need an existing path; we create a throwaway YAML file on disk.
    const dir = mkdtempSync(join(tmpdir(), "buckle-watch-"));
    const filepath = join(dir, "config.yaml");
    writeFileSync(filepath, "version: 1\n");

    const watcher = watchConfig(filepath, () => {
      // Do nothing
    });

    expect(watcher).toBeDefined();
    watcher.close();
  });
});
