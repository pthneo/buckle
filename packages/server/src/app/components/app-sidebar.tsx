import { type Icon, SparkleIcon, TerminalIcon } from "@phosphor-icons/react";
import { NavLink } from "@/app/components/nav-link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/components/ui/sidebar";
import { CATEGORIES, ICONS, LABELS } from "../data";

const navItems: { title: string; url: string; icon: Icon }[] = [
  { title: "Dashboard", url: "/", icon: TerminalIcon },
  ...CATEGORIES.map((category) => ({
    title: LABELS[category],
    url: `/${category}`,
    icon: ICONS[category],
  })),
  { title: "Buckle AI", url: "/ai", icon: SparkleIcon },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-12 border-border border-b p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <img
            alt="Buckle"
            className="h-5 w-5 shrink-0 text-sidebar-primary"
            height={20}
            src="/favicon.ico"
            width={20}
          />
          <span className="font-bold text-sidebar-primary text-sm tracking-tight group-data-[collapsible=icon]:hidden">
            Buckle
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent className="text-sm">
            <SidebarMenu className="gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem className="w-full" key={item.title}>
                  <SidebarMenuButton
                    render={() => (
                      <NavLink
                        activeClassName="bg-accent gap-4 animate-in slide-in-from-left-2 duration-300 text-accent-foreground font-medium"
                        className="flex h-10 w-full items-center gap-3 p-4 transition-colors hover:bg-accent"
                        end={item.url === "/"}
                        to={item.url}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="group-data-[state=collapsed]:hidden">{item.title}</span>
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
