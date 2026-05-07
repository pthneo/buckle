export type ServiceType = "app" | "database" | "cache" | "search" | "objectstore" | "worker";
export type ServiceStatus = "online" | "offline" | "unknown";
export type DatabaseEngine = "postgresql" | "mysql" | "mongodb" | "sqlite";
export type CacheEngine = "redis" | "valkey";
export type SearchEngine = "elasticsearch" | "typesense" | "meilisearch";

export interface ServiceBase {
  createdAt: string;
  healthEndpoint?: string;
  id: string;
  name: string;
  status: ServiceStatus;
  type: ServiceType;
}

export interface AppService extends ServiceBase {
  port: number;
  type: "app";
  url: string;
}

export interface DatabaseService extends ServiceBase {
  database: string;
  engine: DatabaseEngine;
  host: string;
  password: string;
  port: number;
  type: "database";
  username: string;
}

export interface CacheService extends ServiceBase {
  engine: CacheEngine;
  host: string;
  password?: string;
  port: number;
  type: "cache";
}

export interface SearchService extends ServiceBase {
  apiKey?: string;
  engine: SearchEngine;
  host: string;
  port: number;
  type: "search";
}

export interface ObjectStoreService extends ServiceBase {
  accessKey: string;
  bucket: string;
  endpoint: string;
  region?: string;
  secretKey: string;
  type: "objectstore";
}

export interface WorkerService extends ServiceBase {
  description?: string;
  endpoint: string;
  type: "worker";
}

export type Service =
  | AppService
  | DatabaseService
  | CacheService
  | SearchService
  | ObjectStoreService
  | WorkerService;

export interface LogEntry {
  id: string;
  level: "info" | "warn" | "error" | "debug";
  message: string;
  serviceId: string;
  serviceName: string;
  timestamp: string;
}

export const SERVICE_TYPE_LABELS: Record<ServiceType, string> = {
  app: "Application",
  database: "Database",
  cache: "Cache",
  search: "Search Engine",
  objectstore: "Object Store",
  worker: "Worker"
};

export const SERVICE_TYPE_ICONS: Record<ServiceType, string> = {
  app: "Globe",
  database: "Database",
  cache: "Zap",
  search: "Search",
  objectstore: "HardDrive",
  worker: "Cog"
};

export const DATABASE_ENGINES: { value: DatabaseEngine; label: string }[] = [
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "sqlite", label: "SQLite" }
];

export const CACHE_ENGINES: { value: CacheEngine; label: string }[] = [
  { value: "redis", label: "Redis" },
  { value: "valkey", label: "Valkey" }
];

export const SEARCH_ENGINES: { value: SearchEngine; label: string }[] = [
  { value: "elasticsearch", label: "Elasticsearch" },
  { value: "typesense", label: "Typesense" },
  { value: "meilisearch", label: "Meilisearch" }
];

export const DEFAULT_PORTS: Record<string, number> = {
  postgresql: 5432,
  mysql: 3306,
  mongodb: 27_017,
  redis: 6379,
  valkey: 6379,
  elasticsearch: 9200,
  typesense: 8108,
  meilisearch: 7700
};
