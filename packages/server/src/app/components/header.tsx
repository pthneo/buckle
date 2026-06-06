import { useQuery } from "@tanstack/react-query";
import { Bell, Cog } from "lucide-react";
import { metadataQueries } from "../data";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  const { data, isPending } = useQuery(metadataQueries.health());

  return (
    <header className="sticky top-0 z-10 flex w-full p-2">
      <div className="flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-sidebar p-2">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="transition-all duration-300 hover:scale-105" />
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
        <div className="flex items-center">
          <Button
            className="transition-all duration-300 hover:scale-105"
            size="icon"
            variant="ghost"
          >
            <Bell />
          </Button>
          <Button
            className="transition-all duration-300 hover:scale-105"
            size="icon"
            variant="ghost"
          >
            <Cog />
          </Button>
        </div>
      </div>
    </header>
  );
}
