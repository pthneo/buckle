import type { HTMLAttributes } from "react";
import { cn } from "../lib/utils";

export function Title({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "animate-in font-medium text-3xl text-white xs:text-4xl duration-300 sm:text-6xl md:text-4xl xl:text-5xl 2xl:text-7xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

export function Subtitle({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "animate-in text-lg duration-300 md:text-md lg:text-lg xl:text-xl 2xl:text-2xl",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function Heading1({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1 className={cn("animate-in text-3xl duration-300 lg:text-4xl", className)} {...props}>
      {children}
    </h1>
  );
}

export function Subheading({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("animate-in font-light text-base duration-300", className)} {...props}>
      {children}
    </p>
  );
}

export function Heading2({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("animate-in font-light text-xl duration-300 md:text-2xl", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function Heading3({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("animate-in font-medium text-lg duration-300 md:text-xl", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function Heading4({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h4 className={cn("animate-in text-lg duration-300", className)} {...props}>
      {children}
    </h4>
  );
}

export function Text({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("animate-in text-base duration-300", className)} {...props}>
      {children}
    </p>
  );
}

export function Subtext({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("animate-in text-muted-foreground text-sm duration-300", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function ErrorMessage({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("animate-in text-destructive text-sm duration-300", className)} {...props}>
      {children}
    </p>
  );
}

export function Link({ children, className, ...props }: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "animate-in text-sm transition-all duration-100 hover:font-bold lg:text-base",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function SubtextLink({ children, className, ...props }: HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        "animate-in text-muted-foreground text-sm underline transition-all duration-100",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
