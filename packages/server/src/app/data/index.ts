export * from "./categories";
export * from "./databases";
export * from "./metadata";

import {
  ArrowLeftRight,
  Database,
  HardDrive,
  Laptop,
  type LucideIcon,
  Search,
  Webhook,
  Zap,
} from "lucide-react";

// The categories of services
export const CATEGORIES = [
  "databases",
  "caches",
  "queues",
  "search-engines",
  "object-stores",
  "apps",
  "webhooks",
] as const satisfies readonly Category[];

// The icons for the categories
export const ICONS: Record<Category, LucideIcon> = {
  apps: Laptop,
  databases: Database,
  caches: Zap,
  "search-engines": Search,
  "object-stores": HardDrive,
  queues: ArrowLeftRight,
  webhooks: Webhook,
};

// The labels for the categories
export const LABELS: Record<Category, string> = {
  apps: "Apps",
  databases: "Databases",
  caches: "Caches",
  "search-engines": "Search Engines",
  "object-stores": "Object Stores",
  queues: "Queues",
  webhooks: "Webhooks",
};

export function isCategory(slug: string): slug is Category {
  return (CATEGORIES as readonly string[]).includes(slug);
}
