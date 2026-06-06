import { type LucideIcon, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useLocation, useNavigate } from "react-router-dom";
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
  useSidebar,
} from "@/app/components/ui/sidebar";
import { CATEGORIES, ICONS, LABELS } from "../data";
import { cn } from "../lib/utils";
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

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.075,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    x: -8,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export function Sidebar() {
  const { state } = useSidebar();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <SidebarPrimitive collapsible="icon" variant="floating">
      <SidebarHeader className="h-12 border-border p-4 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <img alt="Buckle logo" height={28} src="/logo.webp" width={28} />
          <Heading4 className="group-data-[collapsible=icon]:hidden">Buckle</Heading4>
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="sr-only">Navigation Menu</SidebarGroupLabel>
          <SidebarGroupContent className="text-sm">
            <motion.div animate="show" initial="hidden" key={state} variants={container}>
              <SidebarMenu className="gap-1">
                {navItems.map((itemData) => (
                  <motion.div key={itemData.title} variants={item}>
                    <SidebarMenuItem className="w-full">
                      <SidebarMenuButton
                        className={cn(
                          "flex h-10 w-full items-center gap-3 rounded-md p-4 font-light",
                          "transition-colors duration-300 hover:scale-101 hover:bg-accent",
                          "group-data-[state=collapsed]:size-8 group-data-[state=collapsed]:justify-center",
                          "group-data-[state=collapsed]:p-0",
                          pathname === itemData.url &&
                            "gap-4 bg-zinc-900 font-medium text-accent-foreground"
                        )}
                        onClick={() => {
                          navigate(itemData.url);
                        }}
                        role="link"
                        tooltip={itemData.title}
                      >
                        <itemData.icon className="h-4 w-4 shrink-0" />
                        <span className="group-data-[state=collapsed]:hidden">
                          {itemData.title}
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </motion.div>
                ))}
              </SidebarMenu>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPrimitive>
  );
}
