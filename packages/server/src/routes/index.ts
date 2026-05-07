import { Hono } from "hono";
import { databasesRoutes } from "./databases";

// Create a router for the API
const api = new Hono<AppEnv>();

// Define API routes`
api.route("/databases", databasesRoutes);

/**
 * GET /api/health
 *
 * Returns the health of the server
 */
api.get("/health", (c) => c.json({ status: "ok" }));

/**
 * GET /api/services
 *
 * Returns metadata of the services in the registry
 */
api.get("/services", (c) => {
  const registry = c.get("services");
  return c.json(registry.getMetadata());
});

export { api };
