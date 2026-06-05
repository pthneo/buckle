import { queryOptions } from "@tanstack/react-query";

/**
 * Fetches aggregate health and category counts for services in the registry.
 *
 * @returns Registry metadata from the Buckle server
 */
async function fetchMetadata(): Promise<Metadata> {
  const response = await fetch("/api/services");
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? response.statusText ?? `HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Checks the health of the server
 *
 * @returns True if the server is online, false otherwise
 */
async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch("/api/health");
    if (!response.ok) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export const metadataQueries = {
  all: () =>
    queryOptions({
      queryKey: ["metadata"],
      queryFn: () => fetchMetadata(),
      meta: { errorMessage: "Failed to fetch service metadata" },
    }),
  health: () =>
    queryOptions({
      queryKey: ["health"],
      queryFn: () => checkHealth(),
    }),
};
