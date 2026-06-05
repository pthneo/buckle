import { type LucideIcon, Sparkles, Terminal } from "lucide-react";
import { NavLink } from "@/app/components/nav-link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Sidebar as SidebarPrimitive,
} from "@/app/components/ui/sidebar";
import { CATEGORIES, ICONS, LABELS } from "../data";
import { Heading4 } from "./typography";

const navItems: { title: string; url: string; icon: LucideIcon }[] = [
  { title: "Dashboard", url: "/", icon: Terminal },
  ...CATEGORIES.map((category) => ({
    title: LABELS[category],
    url: `/${category}`,
    icon: ICONS[category],
  })),
  { title: "Buckle AI", url: "/ai", icon: Sparkles },
];

export function Sidebar() {
  return (
    <SidebarPrimitive collapsible="icon" variant="floating">
      <SidebarHeader className="h-12 border-border p-4 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <img
            alt="Buckle"
            className="shrink-0 rounded-fulltext-sidebar-primary"
            height={28}
            src="/logo.webp"
            width={28}
          />
          <Heading4 className="group-data-[collapsible=icon]:hidden">Buckle</Heading4>
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
    </SidebarPrimitive>
  );
}
