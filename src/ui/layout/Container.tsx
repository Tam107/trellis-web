import type { ElementType, ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * The one content column the site uses. Header, page sections and the footer all read from here,
 * so their left edges line up instead of drifting apart per screen.
 */
export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:max-w-10/12 lg:px-8", className)}>{children}</Tag>
  );
}
