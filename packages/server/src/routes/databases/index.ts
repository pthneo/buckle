import { Hono } from "hono";

const databasesRoutes = new Hono<AppEnv>();

/**
 * GET /api/databases
 *
 * Returns a list of all databases
 */
databasesRoutes.get("/", (c) => {
  const registry = c.get("services");
  const databases = registry.getCategory("databases");
  return c.json(
    databases.map((database: Service) => ({
      ...database,
      adapter: undefined
    })) as ServiceResult[]
  );
});

/**
 * GET /api/databases/:id
 *
 * Returns a single database by ID, or 404 if not found
 */
databasesRoutes.get("/:id", (c) => {
  const id = c.req.param("id");
  const registry = c.get("services");
  const database = registry.getService("databases", id);
  if (!database) {
    return c.notFound();
  }
  return c.json({
    ...database,
    adapter: undefined
  } as ServiceResult);
});

export { databasesRoutes };
