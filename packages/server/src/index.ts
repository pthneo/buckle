import { serve } from "bun";
import { Hono } from "hono";
import { loadConfig } from "./config/load";

const DEFAULT_PORT = 7260;
const DEFAULT_CONFIG_PATH = "./buckle.yml";

async function main() {
  // Load the Buckle config
  const port = process.env.PORT || DEFAULT_PORT;
  const configPath = process.env.CONFIG_PATH || DEFAULT_CONFIG_PATH;
  const _ = await loadConfig(configPath);

  // Connect to the services

  // Watch the config file

  // Start the server
  const app = new Hono().basePath("/api");
  app.get("/health", (c) => c.json({ status: "ok" }));
  console.log(`Server running on port ${port}`);

  serve({
    port,
    fetch: app.fetch,
    // TODO: Remove
    development: {
      hmr: true,
      console: true
    }
  });
}

main();
