import { SidebarProvider, SidebarTrigger } from "@app/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <header className="flex h-12 items-center border-border border-b bg-card/50 px-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="ml-4 text-muted-foreground text-xs">
              <span className="text-chart-2">●</span> System Online
            </div>
          </header>
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
