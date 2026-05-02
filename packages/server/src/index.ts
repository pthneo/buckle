import { serve } from "bun";
import { Hono } from "hono";
import { loadConfig, watchConfig } from "@/config";
import { ServiceRegistry } from "@/registry";

const DEFAULT_PORT = 7260;
const DEFAULT_CONFIG_PATH = "./buckle.yml";

async function main() {
  // Load the Buckle config
  const port = process.env.PORT || DEFAULT_PORT;
  const configPath = process.env.CONFIG_PATH || DEFAULT_CONFIG_PATH;
  const config = await loadConfig(configPath);

  // Connect to the services
  let registry = new ServiceRegistry(config);
  registry.connect();
  await registry.checkHealth();

  // Watch the config file
  watchConfig(configPath, (config) => {
    registry.disconnect();
    registry = new ServiceRegistry(config);
    registry.connect();
  });

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
