import { Hono } from "hono";
import { databasesRoutes } from "./databases";

// Create a router for the API
const api = new Hono();

// Define API routes`
api.route("/databases", databasesRoutes);

/**
 * GET /api/health
 *
 * Returns the health of the server
 */
api.get("/health", (c) => c.json({ status: "ok" }));

export { api };
