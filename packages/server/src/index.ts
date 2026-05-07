import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import index from "@/app/index.html";
import { loadConfig, watchConfig } from "@/config";
import { ServiceRegistry } from "@/registry";
import { api } from "@/routes";

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
  const watcher = watchConfig(configPath, async (config) => {
    registry.disconnect();
    registry = new ServiceRegistry(config);
    registry.connect();
    await registry.checkHealth();
  });

  // Update status on an interval
  let inProgress = false;
  const interval = setInterval(async () => {
    if (inProgress) {
      return;
    }
    inProgress = true;
    await registry.checkHealth();
    inProgress = false;
  }, 30_000);

  // Handle shutdown
  const shutdown = async () => {
    watcher.close();
    clearInterval(interval);
    await registry.disconnect();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  // Configure the server
  const app = new Hono<AppEnv>().basePath("/");
  app.use("*", cors());
  app.use("*", logger()); // TODO: Check security
  app.use("/api/*", async (c, next) => {
    c.set("services", registry);
    await next();
  });
  app.route("/api", api);

  // Start the server
  console.log(`Server running on port ${port}`);
  serve({
    port,
    routes: {
      "/*": index,
      "/api/*": app.fetch
    },
    development: process.env.NODE_ENV !== "production" && {
      hmr: true,
      console: true
    }
  });
}

main();
