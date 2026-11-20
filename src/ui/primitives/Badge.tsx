import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-control px-2 py-0.5 text-xs font-medium whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-surface-sunken text-fg-muted",
        brand: "bg-info-subtle text-fg-brand",
        success: "bg-success-subtle text-success",
        warning: "bg-warning-subtle text-warning",
        info: "bg-info-subtle text-info",
        danger: "bg-danger-subtle text-danger",
      },
      size: {
        sm: "px-1.5 text-xs",
        md: "px-2 py-0.5 text-xs",
      },
    },
  },
);

type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export type BadgePropsDefaults = {
  tone: NonNullable<BadgeVariantProps["tone"]>;
  size: NonNullable<BadgeVariantProps["size"]>;
};

export const badgeDefaults: BadgePropsDefaults = { tone: "neutral", size: "md" };

export type BadgeProps = Partial<BadgePropsDefaults> & {
  children: ReactNode;
  /** Shown before the label. */
  icon?: ReactNode;
  className?: string;
};

/** A status or category label. Carries no interaction: wrap it if it must be clickable. */
export function Badge({
  tone = badgeDefaults.tone,
  size = badgeDefaults.size,
  icon,
  className,
  children,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ tone, size }), className)}>
      {icon}
      {children}
    </span>
  );
}
