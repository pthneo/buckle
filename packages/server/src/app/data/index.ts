export * from "./categories";
export * from "./databases";
export * from "./metadata";

import {
  ArrowsLeftRightIcon,
  DatabaseIcon,
  HardDriveIcon,
  type Icon,
  LaptopIcon,
  LightningIcon,
  MagnifyingGlassIcon,
  WebhooksLogoIcon,
} from "@phosphor-icons/react";

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
export const ICONS: Record<Category, Icon> = {
  apps: LaptopIcon,
  databases: DatabaseIcon,
  caches: LightningIcon,
  "search-engines": MagnifyingGlassIcon,
  "object-stores": HardDriveIcon,
  queues: ArrowsLeftRightIcon,
  webhooks: WebhooksLogoIcon,
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
