import { randomUUIDv7 } from "bun";
import { createDatabaseAdapter } from "@/adapters";

// The categories of services
const CATEGORIES = [
  "databases",
  "caches",
  "queues",
  "search-engines",
  "object-stores",
  "apps",
  "webhooks"
] as const;

// The type of the categories
type Category = (typeof CATEGORIES)[number];

/**
 * The service registry stores and manages the connections to each of the services.
 */
export class ServiceRegistry {
  // Two-dimensional map of services by category and name
  private readonly services = new Map<Category, Map<string, Service>>();

  /**
   * Initialises the service registry with the services from the config
   *
   * @param config - The config to initialise the service registry with
   */
  constructor(config: Config) {
    // Initialize the services map
    for (const category of CATEGORIES) {
      this.services.set(category, new Map());
    }

    // Initialize the databases
    for (const database of config.databases) {
      const id = randomUUIDv7();
      const adapter = createDatabaseAdapter(database);

      this.services.get("databases")!.set(id, {
        adapter,
        name: database.name,
        description: database.description,
        type: database.type,
        status: "unknown"
      });
    }
  }

  /**
   * Connects to all the services in the registry
   */
  connect(): void {
    for (const category of CATEGORIES) {
      for (const service of this.services.get(category)!.values()) {
        service.adapter.connect();
      }
    }
  }

  /**
   * Checks the health of all the services in the registry and updates the status of the services
   *
   * @returns A promise that resolves when the health checks are complete
   */
  async checkHealth(): Promise<void> {
    const tasks: Promise<void>[] = [];
    for (const category of CATEGORIES) {
      for (const service of this.services.get(category)!.values()) {
        tasks.push(
          service.adapter.checkHealth().then((ok: boolean) => {
            service.status = ok ? "healthy" : "unhealthy";
          })
        );
      }
    }
    await Promise.all(tasks);
  }

  /**
   * Returns all the services in a category
   *
   * @param category - The category of the services
   * @returns An array of the services in the category
   */
  getCategory(category: (typeof CATEGORIES)[number]): Service[] {
    return Array.from(this.services.get(category)!.values());
  }

  /**
   * Returns a service by id
   *
   * @param category - The category of the services
   * @param id - The id of the service
   * @returns The service with the given id, or undefined if the service is not found
   */
  getService(category: (typeof CATEGORIES)[number], id: string): Service | undefined {
    return this.services.get(category)?.get(id);
  }

  /**
   * Disposes of the service registry and disconnects from all the services
   *
   * @returns A promise that resolves when the services are disconnected
   */
  async disconnect(): Promise<void> {
    const tasks: Promise<void>[] = [];
    for (const category of CATEGORIES) {
      for (const service of this.services.get(category)!.values()) {
        tasks.push(service.adapter.disconnect());
      }
    }
    await Promise.all(tasks);
    for (const category of CATEGORIES) {
      this.services.get(category)!.clear();
    }
  }
}
