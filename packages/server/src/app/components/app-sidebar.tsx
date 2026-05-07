import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@app/components/ui/sidebar";
import { BarChart3, ScrollText, Search, Server, Terminal } from "lucide-react";
import { NavLink } from "@/app/components/nav-link";

const navItems = [
  { title: "Dashboard", url: "/", icon: Terminal },
  { title: "Services", url: "/services", icon: Server },
  { title: "Logs", url: "/logs", icon: ScrollText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Inspector", url: "/inspector", icon: Search }
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-border border-b p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Terminal className="h-5 w-5 shrink-0 text-sidebar-primary" />
          <span className="font-bold text-sidebar-primary text-sm tracking-tight group-data-[collapsible=icon]:hidden">
            BUCKLE
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem className="w-full" key={item.title}>
                  <SidebarMenuButton
                    render={() => (
                      <NavLink
                        activeClassName="bg-accent gap-3 animate-in slide-in-from-left-2 duration-300 text-accent-foreground font-medium"
                        className="flex h-10 w-full items-center gap-2 p-4 transition-colors hover:bg-accent"
                        end={item.url === "/"}
                        to={item.url}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </NavLink>
                    )}
                    tooltip={item.title}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
