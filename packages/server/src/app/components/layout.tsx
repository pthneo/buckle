import { Sidebar } from "@/app/components/sidebar";
import { SidebarProvider } from "@/app/components/ui/sidebar";
import Header from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <main className="flex flex-1 flex-col">
          <Header />
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
