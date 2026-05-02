import { Hono } from "hono";

const databasesRoutes = new Hono<AppEnv>();

/**
 * GET /api/databases
 *
 * Returns a list of all databases
 */
databasesRoutes.get("/", (c) => {
  const registry = c.get("services");
  const databases = registry.getServices("databases");
  return c.json(databases);
});

/**
 * GET /api/databases/:id
 *
 * Returns a single database by ID
 */
databasesRoutes.get("/:id", (c) => {
  const id = c.req.param("id");
  const registry = c.get("services");
  const database = registry.getService("databases", id);
  return c.json(database);
});

export { databasesRoutes };
