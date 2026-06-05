import { Hono } from "hono";
import { CATEGORIES } from "@/registry";
import { createCategoryRoutes } from "./categories";

// Create a router for the API
const api = new Hono<AppEnv>();

for (const category of CATEGORIES) {
  api.route(`/${category}`, createCategoryRoutes(category));
}

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
