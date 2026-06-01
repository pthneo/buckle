import { queryOptions } from "@tanstack/react-query";

/**
 * Fetches aggregate health and category counts for services in the registry.
 *
 * @returns Registry metadata from the Buckle server
 */
async function fetchMetadata(): Promise<Metadata> {
  const response = await fetch("/api/services");
  if (!response.ok) {
    throw new Error("Failed to fetch service metadata");
  }
  return response.json();
}

export const metadataQueries = {
  all: () =>
    queryOptions({
      queryKey: ["metadata"],
      queryFn: () => fetchMetadata(),
    }),
};
