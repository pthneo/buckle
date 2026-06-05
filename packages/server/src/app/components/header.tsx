import { SidebarTrigger } from "./ui/sidebar";

export default function Header() {
  return (
    <header className="flex w-full p-2">
      <div className="flex w-full items-center rounded-lg border border-border bg-sidebar p-1">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="ml-4 text-muted-foreground text-xs">
          <span className="text-chart-2">●</span> System Online
        </div>
      </div>
    </header>
  );
}
