import { useQuery } from "@tanstack/react-query";
import { metadataQueries } from "../data";
import { cn } from "../lib/utils";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  const { data, isPending } = useQuery(metadataQueries.health());

  return (
    <header className="flex w-full p-2">
      <div className="flex w-full items-center gap-3 rounded-lg border border-border bg-sidebar p-1">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div
          className={cn(
            "flex h-full items-center gap-2",
            isPending
              ? "animate-pulse text-muted-foreground"
              : data
                ? "text-green-500"
                : "text-red-500"
          )}
        >
          <span className="-mt-0.5 text-xl">●</span>
          <span className="text-sm">
            {isPending ? "Connecting..." : data ? "System Online" : "Error"}
          </span>
        </div>
      </div>
    </header>
  );
}
