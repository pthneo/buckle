/**
 * A service in the registry
 */
type Service = {
  // The adapter for the service
  adapter: Adapter<unknown, ServiceConfig>;
  // The name of the service
  name: string;
  // The description of the service
  description?: string | undefined;
  // The type of the service
  type: string;
  // The status of the service
  status: "healthy" | "unhealthy" | "unknown";
};
