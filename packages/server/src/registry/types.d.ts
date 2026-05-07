// Registry bucket names
type Category =
  | "databases"
  | "caches"
  | "queues"
  | "search-engines"
  | "object-stores"
  | "apps"
  | "webhooks";

// A service in the registry
type Service = {
  // The id of the service
  id: string;
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

// Serializable service type
type ServiceResult = Service & {
  adapter: undefined;
};

// Metadata about the services in the registry
type Metadata = {
  healthy: number;
  unhealthy: number;
  unknown: number;
  total: number;
  categories: {
    [key in Category]: number;
  };
};
