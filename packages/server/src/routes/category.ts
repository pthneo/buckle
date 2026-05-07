import { Hono } from "hono";
import type { CATEGORIES } from "@/registry";

export type RegisteredCategory = (typeof CATEGORIES)[number];

function toServiceResult(service: Service): ServiceResult {
  return {
    ...service,
    adapter: undefined
  };
}

/**
 * List and detail routes for a single registry category, e.g. GET /api/webhooks, GET /api/webhooks/:id
 */
export function createCategoryRoutes(category: RegisteredCategory) {
  const routes = new Hono<AppEnv>();

  routes.get("/", (c) => {
    const registry = c.get("services");
    const services = registry.getCategory(category);
    return c.json(services.map(toServiceResult));
  });

  routes.get("/:id", (c) => {
    const id = c.req.param("id");
    const registry = c.get("services");
    const service = registry.getService(category, id);
    if (!service) {
      return c.notFound();
    }
    return c.json(toServiceResult(service));
  });

  return routes;
}
