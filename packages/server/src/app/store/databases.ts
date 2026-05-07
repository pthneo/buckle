import { queryOptions } from "@tanstack/react-query";

/**
 * Fetches a list of all databases
 *
 * @returns A list of all databases
 */
async function fetchDatabases(): Promise<ServiceResult[]> {
  const response = await fetch("/api/databases");
  if (!response.ok) {
    throw new Error("Failed to fetch databases");
  }
  return response.json();
}

/**
 * Fetches a single database by ID
 *
 * @param id - The id of the database to fetch
 * @returns The database as a ServiceResult
 */
async function fetchDatabase(id: string): Promise<ServiceResult> {
  const response = await fetch(`/api/databases/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch database");
  }
  return response.json();
}

// The react-query queries relevant to databases
export const databaseQueries = {
  all: () =>
    queryOptions({
      queryKey: ["databases"],
      queryFn: () => fetchDatabases()
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: ["databases", id],
      queryFn: () => fetchDatabase(id)
    })
};
