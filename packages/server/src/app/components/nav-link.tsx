import { cn } from "@app/lib/utils";
import { forwardRef } from "react";
import { type NavLinkProps, NavLink as RouterNavLink } from "react-router-dom";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  activeClassName?: string;
  className?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        ref={ref}
        to={to}
        {...props}
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
