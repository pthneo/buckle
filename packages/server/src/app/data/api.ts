import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const api = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

// Subscribe to errors thrown by the API
api.getQueryCache().subscribe((event) => {
  if (event.type === "updated" && event.action.type === "error") {
    console.error(event.action.error);
    const message =
      (event.query.meta?.errorMessage as string | undefined) ?? "An unknown error occurred";
    toast.error(message);
  }
});
