import { categoryQueries } from "./categories";

// The react-query queries relevant to databases
export const databaseQueries = {
  all: () => categoryQueries.list("databases"),
  detail: (id: string) => categoryQueries.detail("databases", id),
};

// TODO: Add queries to obtain logs and perform SQL.
